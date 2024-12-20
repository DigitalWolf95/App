export class AnalyticsPluginGtm {
  public gtag(...t: any) {
    if (!window.dataLayer) throw new Error('Run Gtag init function first!');
    // eslint-disable-next-line prefer-rest-params
    console.log('args => ', arguments);
    // eslint-disable-next-line prefer-rest-params
    window.dataLayer.push(arguments);
  }

  public init(gtmId: string): void {
    window.dataLayer = window.dataLayer || [];
    window.dataLayer.push({ 'gtm.start': new Date().getTime(), event: 'gtm.js' });

    this.gtag('consent', 'default', {
      ad_storage: 'denied',
      analytics_storage: 'denied',
      ad_user_data: 'denied',
      ad_personalization: 'denied',
      personalization_storage: 'denied',
      functionality_storage: 'denied',
      security_storage: 'denied',
    });

    const gtagScript = document.createElement('script');
    gtagScript.type = 'text/javascript';
    gtagScript.async = true;
    gtagScript.id = 'gtm';
    gtagScript.src = `https://www.googletagmanager.com/gtm.js?id=${gtmId}`;

    const scr = document.getElementsByTagName('script')[0];
    scr?.parentNode?.insertBefore(gtagScript, scr);
  }
}
// <!-- Google Tag Manager -->
// <script>(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
//     new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
//   j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
//   'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
// })(window,document,'script','dataLayer','GTM-WJ27WVCG');</script>
// <!-- End Google Tag Manager -->
