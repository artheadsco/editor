jQuery( document ).ready( function ( $ ) {

    $('[data-sed-role="carousel"]').livequery(function(){

        var data = $(this).data(),
            options = {} ,
            breakpoint_lg ,
            breakpoint_md;

        for( var property in data ){
            if(property != "sedRole" && data.hasOwnProperty( property ) )
                options[property] = data[property];
        }

        if( options['slidesToShow'] < options['slidesToScroll'] )
            options['slidesToScroll'] = options['slidesToShow'];

        if( options['slidesToShow'] >= 3  ){
            breakpoint_lg  = 3;
        }else{
            breakpoint_lg  = options['slidesToShow'];
        }

        if( options['slidesToShow'] >= 2  ){
            breakpoint_md  = 2;
        }else{
            breakpoint_md  = options['slidesToShow'];
        }

        if( $("body").hasClass("rtl-body") ){
            options['rtl'] = true;
        }

        var slick_options = $.extend({} , {
            slidesToShow: 3,
            slidesToScroll: 1,
            prevArrow : '<span class="slide-nav-bt slide-prev"><i class="fa fa-angle-left"></i></span>',
            nextArrow : '<span class="slide-nav-bt slide-next"><i class="fa fa-angle-right"></i></span>',
            swipe      : true ,
            touchMove  : true ,
            //centerMode: true,
            //centerPadding: '60px',
            responsive: [
                {
                    breakpoint: 1024,
                    settings: {
                        slidesToShow: breakpoint_lg,
                        slidesToScroll: breakpoint_lg
                    }
                },
                {
                    breakpoint: 600,
                    settings: {
                        slidesToShow: breakpoint_md,
                        slidesToScroll: breakpoint_md
                    }
                },
                {
                    breakpoint: 480,
                    settings: {
                        slidesToShow:2,
                        slidesToScroll: 1 ,
                        arrows: false
                    }
                }
            ]
        } , options );

        var $element = $(this),
            $container = $element.parents(".sed-pb-module-container:first") ,
            $this = $(this);

        if( $container.length > 0 ) {

            //sed.moduleResizeStop
            $container.on("sed.moduleSortableStop sed.moduleResize sed.moduleResizeStop sedAfterRemoveColumns" , function(){
                $this.slick('unslick');
                $this.slick( slick_options );
            });


            $container.find("img").on( "sed.changeImgSrc", function( event , newSrc ){
                $this.slick('unslick');
                $this.slick( slick_options );
            });

            $container.on("sedChangeModulesLength", function (e, length) {
                $this.slick('unslick');
                $this.slick(slick_options);
            });

            $container.on("sedChangedSheetWidth", function () {
                if ($(this).parents(".sed-row-boxed").length > 0) {
                    $this.slick('unslick');
                    $this.slick(slick_options);
                }
            });

            $container.on("sedChangedPageLength", function (e, length) {
                if (($(this).parents(".sed-row-boxed").length == 0 && length == "wide" ) || ($(this).parents(".sed-row-boxed").length == 1 && length == "boxed" )) {
                    $this.slick('unslick');
                    $this.slick(slick_options);
                }
            });

            $container.on("sedFirstTimeActivatedTabs", function () {
                $this.slick('unslick');
                $this.slick(slick_options);
            });

            $container.on("sedFirstTimeActivatedAccordionTabs", function () {
                $this.slick('unslick');
                $this.slick(slick_options);
            });

            $container.on("sedFirstTimeMegamenuActivated", function () {
                $this.slick('unslick');
                $this.slick(slick_options);
            });
        }

        $(this).slick(slick_options);

    });
    
});