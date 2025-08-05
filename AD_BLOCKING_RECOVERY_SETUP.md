# Ad Blocking Recovery Setup Guide

I've implemented the Google AdSense Ad Blocking Recovery functionality based on your AdSense dashboard instructions. Here's what's been added and how to configure it:

## ✅ What's Been Implemented

### 1. Ad Blocking Recovery Scripts
- **Funding Choices Messages**: Script that detects ad blockers and shows recovery messages
- **Signal Script**: Creates a hidden iframe to signal Google's ad recovery system
- **Error Protection**: Handles cases where ad blocking stops the recovery message

### 2. Configuration Options
Added new configuration in `src/lib/ads.ts`:
```typescript
AD_BLOCKING_RECOVERY: process.env.NEXT_PUBLIC_ENABLE_AD_BLOCKING_RECOVERY !== 'false'
```

### 3. Integration in Layout
The scripts are now included in `src/app/layout.tsx` and will only load when:
- Ads are enabled (`AD_CONFIG.ENABLED`)
- Publisher ID is set (`AD_CONFIG.PUBLISHER_ID`)
- Ad blocking recovery is enabled (`AD_CONFIG.AD_BLOCKING_RECOVERY`)

## 🔧 How to Configure

### Environment Variables

Add to your `.env.local` or production environment:

```bash
# Required - Your AdSense Publisher ID
NEXT_PUBLIC_ADSENSE_PUBLISHER_ID="ca-pub-2701468620398349"

# Optional - Disable ad blocking recovery if needed
NEXT_PUBLIC_ENABLE_AD_BLOCKING_RECOVERY="false"  # Default: true

# Optional - Enable ads in development
NEXT_PUBLIC_SHOW_ADS="true"  # Default: false in dev
```

## 📋 AdSense Dashboard Setup

To complete the setup in your Google AdSense dashboard:

1. **Go to Privacy & messaging → Tagging**
2. **Verify the scripts are detected** (may take 24-48 hours)
3. **Create your recovery message** in the AdSense interface
4. **Test with an ad blocker** to see the recovery flow

## 🧪 Testing

### Test the Implementation:

1. **Enable ads in development**:
   ```bash
   # In .env.local
   NEXT_PUBLIC_SHOW_ADS="true"
   NEXT_PUBLIC_ADSENSE_PUBLISHER_ID="ca-pub-2701468620398349"
   ```

2. **Install an ad blocker** (uBlock Origin, AdBlock Plus)

3. **Visit your site** and look for:
   - Recovery messages when ads are blocked
   - Console logs indicating scripts are loading
   - Hidden iframe with name `googlefcPresent`

### Debug Information:

Check browser console for:
- Script loading success/failures
- AdSense initialization messages
- Recovery system activation

## 🔍 How It Works

### Detection Process:
1. **Funding Choices script** loads and detects ad blocking
2. **Signal iframe** communicates with Google's systems
3. **Recovery message** shows to users with ad blockers
4. **Error protection** handles edge cases and failures

### User Experience:
- Users without ad blockers: Normal ad experience
- Users with ad blockers: See recovery messages asking to allow ads
- Graceful fallbacks if scripts fail to load

## 📊 Monitoring

### AdSense Dashboard:
- Monitor recovery message impressions
- Track ad blocker detection rates
- Analyze revenue recovery metrics

### Analytics:
- Recovery message views
- User engagement with recovery prompts
- Conversion rates from recovery to ad views

## 🚨 Troubleshooting

### Common Issues:

1. **Scripts not loading**:
   - Check environment variables
   - Verify Publisher ID format
   - Ensure ads are enabled

2. **Recovery messages not showing**:
   - Wait 24-48 hours for Google to process
   - Test with different ad blockers
   - Check browser console for errors

3. **Performance concerns**:
   - Scripts load `beforeInteractive` for optimal timing
   - Minimal impact on page load speed
   - Can be disabled via environment variable

## 💡 Best Practices

1. **Message Content**: Create user-friendly recovery messages
2. **Frequency**: Don't show messages too aggressively
3. **Testing**: Regularly test with different ad blockers
4. **Monitoring**: Track metrics to optimize recovery rates

## 🔄 Next Steps

1. **Deploy to production** with proper environment variables
2. **Wait 24-48 hours** for AdSense to detect the implementation
3. **Configure recovery messages** in AdSense dashboard
4. **Monitor performance** and adjust as needed

The implementation is now ready and will automatically work once your site is live with the proper AdSense configuration!