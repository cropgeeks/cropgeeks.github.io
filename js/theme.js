;(function($){
    "use strict"

  const orgs = ['https://api.github.com/orgs/cropgeeks/repos?type=all&per_page=100&page=1', 'https://api.github.com/orgs/germinateplatform/repos?type=all&per_page=100&page=1']
  axios.all(orgs.map(o => axios.get(o)))
    .then(responses => {
      const cropgeeks = responses[0].data
      const germinate = responses[1].data

      const repos = [...cropgeeks, ...germinate]
      const repoCount = repos.length
      const stars = repos.map(r => r.stargazers_count || 0).reduce((a, b) => a + b, 0)
      const watchers = repos.map(r => r.watchers_count || 0).reduce((a, b) => a + b, 0)
      const languages = new Set()
      repos.filter(r => r.language).forEach(r => languages.add(r.language))

      $('#stargazer-count').html(stars + watchers)
      $('#repo-count').html(repoCount)
      $('#language-count').html(languages.size)
    })
	
	
	/*----------------------------------------------------*/
    /*  Isotope Fillter js
    /*----------------------------------------------------*/
	function gallery_isotope(){
        if ( $('.gallery_f_inner').length ){
            // Activate isotope in container
			$(".gallery_f_inner").imagesLoaded( function() {
                $(".gallery_f_inner").isotope({
                    layoutMode: 'fitRows',
                    animationOptions: {
                        duration: 750,
                        easing: 'linear'
                    }
                }); 
            });
			
            // Add isotope click function
            $(".gallery_filter li").on('click',function(){
                $(".gallery_filter li").removeClass("active");
                $(this).addClass("active");

                var selector = $(this).attr("data-filter");
                $(".gallery_f_inner").isotope({
                    filter: selector,
                    animationOptions: {
                        duration: 450,
                        easing: "linear",
                        queue: false,
                    }
                });
                return false;
            });
        }
    }
    gallery_isotope();
	
})(jQuery)