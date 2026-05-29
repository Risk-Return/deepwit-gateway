package billing_setting

import (
	"strings"
	"sync"

	"github.com/QuantumNous/new-api/common"
)

const (
	BillingModeVideoGen = "video_gen"
)

// VideoGenPriceConfig defines per-token pricing for video generation models.
// Each combination of (resolution tier, video input presence) maps to a price
// per completion_token. Final cost = completion_tokens * price.
type VideoGenPriceConfig struct {
	LowResNoVideo    float64 `json:"low_res_no_video"`    // 480p/720p, no video input
	LowResWithVideo  float64 `json:"low_res_with_video"`  // 480p/720p, with video input
	HighResNoVideo   float64 `json:"high_res_no_video"`   // 1080p, no video input
	HighResWithVideo float64 `json:"high_res_with_video"` // 1080p, with video input
}

// Validate checks all 4 fields have positive values.
func (c *VideoGenPriceConfig) Validate() bool {
	return c.LowResNoVideo > 0 && c.LowResWithVideo > 0 &&
		c.HighResNoVideo > 0 && c.HighResWithVideo > 0
}

// Max returns the maximum price among all 4 combinations (for conservative pre-consume).
func (c *VideoGenPriceConfig) Max() float64 {
	m := c.LowResNoVideo
	if c.LowResWithVideo > m {
		m = c.LowResWithVideo
	}
	if c.HighResNoVideo > m {
		m = c.HighResNoVideo
	}
	if c.HighResWithVideo > m {
		m = c.HighResWithVideo
	}
	return m
}

// Pick returns the appropriate price factor based on resolution tier and video input.
// highRes=true for 1080p, false for 720p/480p. hasVideo=true if request includes video reference.
func (c *VideoGenPriceConfig) Pick(highRes bool, hasVideo bool) float64 {
	if highRes {
		if hasVideo {
			return c.HighResWithVideo
		}
		return c.HighResNoVideo
	}
	if hasVideo {
		return c.LowResWithVideo
	}
	return c.LowResNoVideo
}

// ---------------------------------------------------------------------------
// In-memory store: model → VideoGenPriceConfig
// ---------------------------------------------------------------------------

var (
	videoGenPricingMu sync.RWMutex
	videoGenPricing   = make(map[string]*VideoGenPriceConfig)
)

// GetVideoGenPrice returns the video gen price config for a model, or nil if not configured.
func GetVideoGenPrice(model string) *VideoGenPriceConfig {
	videoGenPricingMu.RLock()
	defer videoGenPricingMu.RUnlock()
	return videoGenPricing[model]
}

// SetVideoGenPrice sets the video gen price config for a model.
func SetVideoGenPrice(model string, cfg *VideoGenPriceConfig) {
	videoGenPricingMu.Lock()
	defer videoGenPricingMu.Unlock()
	videoGenPricing[model] = cfg
}

// DeleteVideoGenPrice removes the video gen price config for a model.
func DeleteVideoGenPrice(model string) {
	videoGenPricingMu.Lock()
	defer videoGenPricingMu.Unlock()
	delete(videoGenPricing, model)
}

// GetAllVideoGenPricing returns a copy of all video gen pricing configs.
func GetAllVideoGenPricing() map[string]*VideoGenPriceConfig {
	videoGenPricingMu.RLock()
	defer videoGenPricingMu.RUnlock()
	result := make(map[string]*VideoGenPriceConfig, len(videoGenPricing))
	for k, v := range videoGenPricing {
		result[k] = v
	}
	return result
}

// LoadVideoGenPricingFromJSON loads all video gen pricing from JSON map.
func LoadVideoGenPricingFromJSON(jsonStr string) error {
	if strings.TrimSpace(jsonStr) == "" {
		return nil
	}
	data := make(map[string]*VideoGenPriceConfig)
	if err := common.UnmarshalJsonStr(jsonStr, &data); err != nil {
		return err
	}
	videoGenPricingMu.Lock()
	defer videoGenPricingMu.Unlock()
	videoGenPricing = data
	return nil
}

// ExportVideoGenPricingJSON exports all video gen pricing as JSON string.
func ExportVideoGenPricingJSON() (string, error) {
	videoGenPricingMu.RLock()
	defer videoGenPricingMu.RUnlock()
	b, err := common.Marshal(videoGenPricing)
	if err != nil {
		return "", err
	}
	return string(b), nil
}

// UpdateVideoGenPricingJSON updates a single model's video gen pricing in the DB store,
// then persists the full map to DB via the provided saveFunc.
func UpdateVideoGenPricingJSON(model string, cfg *VideoGenPriceConfig, saveFunc func(key, value string) error) error {
	if !cfg.Validate() {
		return errInvalidVideoGenConfig(model)
	}
	SetVideoGenPrice(model, cfg)
	jsonStr, err := ExportVideoGenPricingJSON()
	if err != nil {
		return err
	}
	return saveFunc("video_gen_pricing", jsonStr)
}

func errInvalidVideoGenConfig(model string) error {
	return &VideoGenPriceError{Model: model}
}

type VideoGenPriceError struct {
	Model string
}

func (e *VideoGenPriceError) Error() string {
	return "video gen pricing for model " + e.Model + " is invalid: all 4 price fields must be > 0"
}

// IsVideoGenPriceError checks if the error is a VideoGenPriceError.
func IsVideoGenPriceError(err error) bool {
	_, ok := err.(*VideoGenPriceError)
	return ok
}
