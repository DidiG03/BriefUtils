# Google AdSense Setup Guide for BriefUtils

## Current Issues and Solutions

### Issue 1: "Couldn't verify your site" Error
This happens when Google AdSense can't find or verify your AdSense code on your website.

**Solution:**
1. Get your AdSense Publisher ID from Google AdSense dashboard
2. Set up environment variables (see step 2 below)
3. Deploy the changes to production
4. Update your ads.txt file (see step 4 below)

### Issue 2: "Only one 'enable_page_level_ads' allowed per page" Console Error
This was caused by duplicate auto ads initialization.

**Solution:** ✅ **FIXED** - Updated the auto ads initialization to prevent duplicates.

## Step-by-Step Setup

### Step 1: Get Your AdSense Publisher ID
1. Go to [Google AdSense](https://www.google.com/adsense/)
2. Sign in to your account
3. Navigate to **Account** → **Account Information**
4. Copy your Publisher ID (format: `ca-pub-XXXXXXXXXXXXXXXX`)

### Step 2: Set Environment Variables on Vercel
1. Go to your [Vercel Dashboard](https://vercel.com/dashboard)
2. Select your `TinyTools` project
3. Go to **Settings** → **Environment Variables**
4. Add these variables:

```
Name: NEXT_PUBLIC_ADSENSE_PUBLISHER_ID
Value: ca-pub-your-actual-publisher-id

Name: NEXT_PUBLIC_SHOW_ADS
Value: true

Name: NEXT_PUBLIC_ENABLE_AUTO_ADS
Value: true
```

### Step 3: Update ads.txt File
1. Open the file `public/ads.txt` in your project
2. Replace the example line with your actual publisher ID:
```
google.com, pub-XXXXXXXXXXXXXXXX, DIRECT, f08c47fec0942fa0
```
3. Remove the `ca-` prefix from your publisher ID (so `ca-pub-2701468620398349` becomes `pub-2701468620398349`)
4. Uncomment the line (remove the `#` at the beginning)

### Step 4: Deploy and Verify
1. Commit and push your changes:
```bash
git add .
git commit -m "Update AdSense configuration"
git push
```

2. Wait for Vercel to deploy (usually 1-2 minutes)

3. Verify your ads.txt file is accessible:
   - Visit: https://briefutils.com/ads.txt
   - You should see your publisher ID listed

4. Verify AdSense script is loading:
   - Visit your website
   - Open Developer Tools → Network tab
   - Look for requests to `pagead2.googlesyndication.com`

### Step 5: AdSense Site Verification
1. Go back to Google AdSense
2. In your site list, click **"Review"** next to briefutils.com
3. Google will now be able to verify your site
4. This process can take 24-48 hours

## Testing Your Setup

### In Development:
- Set `NEXT_PUBLIC_SHOW_ADS=true` in your `.env.local` file
- Run `npm run dev`
- You should see ad placeholders

### In Production:
- After setting environment variables on Vercel
- After deploying your changes
- Visit your live site
- Check browser console for any errors
- AdSense ads may take 1-2 hours to start showing

## Common Issues and Fixes

### "AdSense script not loading"
- Check your publisher ID is correct
- Verify environment variables are set on Vercel
- Check network tab for script loading errors

### "Ads not showing"
- AdSense approval can take 24-48 hours
- New sites need traffic and content before approval
- Ensure ads.txt file is accessible
- Check AdSense dashboard for approval status

### "Revenue not tracking"
- Set up Google Analytics (optional but recommended)
- Add `NEXT_PUBLIC_GA_MEASUREMENT_ID` environment variable
- Connect AdSense with Analytics for better insights

## Next Steps After Approval

1. **Monitor Performance:**
   - Check AdSense dashboard for earnings
   - Monitor page load speeds
   - Track user engagement

2. **Optimize Ad Placements:**
   - The current setup includes strategic ad placements
   - Monitor which placements perform best
   - Adjust ad sizes based on performance

3. **Scale Traffic:**
   - More traffic = more revenue
   - Focus on SEO optimization
   - Add more useful tools
   - Share on social media

## Support

If you continue having issues:
1. Check Vercel deployment logs
2. Verify all environment variables are set
3. Ensure your AdSense account is in good standing
4. Wait 24-48 hours for Google's verification process

Your setup is now optimized for AdSense approval and monetization! 🚀