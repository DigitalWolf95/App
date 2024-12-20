export class AnalyticsPluginGtag {
  public gtag(...t: any) {
    if (!window.dataLayer) throw new Error('Run Gtag init function first!');
    // eslint-disable-next-line prefer-rest-params
    console.log('args => ', arguments);
    // eslint-disable-next-line prefer-rest-params
    window.dataLayer.push(arguments);
  }

  public init(gTagId: string): void {
    window.dataLayer = window.dataLayer || [];

    this.gtag('consent', 'default', {
      ad_storage: 'denied',
      analytics_storage: 'denied',
      personalization_storage: 'denied',
      functionality_storage: 'denied',
      security_storage: 'denied',
    });

    this.gtag('js', new Date());
    this.gtag('config', gTagId);

    const gtagScript = document.createElement('script');
    gtagScript.type = 'text/javascript';
    gtagScript.async = true;
    gtagScript.id = 'gtag';
    gtagScript.src = `https://www.googletagmanager.com/gtag/js?id=${gTagId}`;

    const scr = document.getElementsByTagName('script')[0];
    scr?.parentNode?.insertBefore(gtagScript, scr);
  }
}
