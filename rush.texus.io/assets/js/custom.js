(function () {
  // schedule
  lottie.loadAnimation({
    container: document.getElementById('jsi-heading-schedule-pc'),
    renderer: 'svg',
    loop: true,
    autoplay: true,
    path: 'json/h-schedule.json'
  });

   // process
  lottie.loadAnimation({
    container: document.getElementById('jsi-heading-process-pc'),
    renderer: 'svg',
    loop: true,
    autoplay: true,
    path: 'json/h-process.json'
  });
  
}());
		(function () {
	  var controller = new ScrollMagic.Controller();

    new ScrollMagic.Scene({triggerElement: '#jsi-scroll-schedule', triggerHook: 'onEnter', offset: 300})
	      .setClassToggle('#jsi-scroll-schedule', 'is-active')
	      .reverse(false)
	      .addTo(controller);
		  
	new ScrollMagic.Scene({triggerElement: '#jsi-header-scroll-trigger01', triggerHook: 'onEnter', offset: 150})
	      .setClassToggle('#jsi-header-scroll-trigger01', 'is-active')
	      .reverse(false)
	      .addTo(controller);

    new ScrollMagic.Scene({triggerElement: '#jsi-header-scroll-trigger02', triggerHook: 'onEnter', offset: 200})
	      .setClassToggle('#jsi-header-scroll-trigger02', 'is-active')
	      .reverse(false)
	      .addTo(controller);

    new ScrollMagic.Scene({triggerElement: '#jsi-header-scroll-trigger03', triggerHook: 'onEnter', offset: 300})
	      .setClassToggle('#jsi-header-scroll-trigger03', 'is-active')
	      .reverse(false)
	      .addTo(controller);

    new ScrollMagic.Scene({triggerElement: '#jsi-header-scroll-trigger04', triggerHook: 'onEnter', offset: 400})
	      .setClassToggle('#jsi-header-scroll-trigger04', 'is-active')
	      .reverse(false)
	      .addTo(controller);
	      
	          new ScrollMagic.Scene({triggerElement: '#jsi-entry-button', triggerHook: 'onEnter', offset: 400})
        .setClassToggle('#jsi-entry-button', 'is-active')
        .reverse(false)
        .addTo(controller);


}());