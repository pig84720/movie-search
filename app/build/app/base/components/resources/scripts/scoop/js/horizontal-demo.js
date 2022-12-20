
$( document ).ready(function() {

	$( "#scoop" ).scoopmenu({
		themelayout: 'horizontal',
		horizontalMenulayout: 'widebox',
		horizontalMenuplacement: 'top',
		horizontalBrandItem: false,
		horizontalLeftNavItem: true,
		horizontalRightItem: true,
		horizontalSearchItem: true,
		horizontalBrandItemAlign: 'left',
		horizontalLeftNavItemAlign: 'left',
		horizontalRightItemAlign: 'right',
		horizontalsearchItemAlign: 'right',
		horizontalMobileMenu: true,
		MenuTrigger: 'click',
		SubMenuTrigger: 'click',
		activeMenuClass: 'active',
		ThemeBackgroundPattern: 'pattern7',
		HeaderBackground: 'theme4' ,
		LHeaderBackground :'theme4',
		NavbarBackground: 'theme4',
		ActiveItemBackground: 'theme0',
		SubItemBackground: 'theme2',
		ActiveItemStyle: 'style1',
		ItemBorder: true,
		ItemBorderStyle: 'solid',
		SubItemBorder: true,
		DropDownIconStyle: 'style1',
		FixedNavbarPosition: false,
		FixedHeaderPosition: false,
		horizontalNavIsCentered: false,
		horizontalstickynavigation: true,
		horizontalNavigationMenuIcon: true,
	});

 /* Navbar Theme Change function Start */
	function handlenavbartheme() {
		$('.theme-color > a.navbar-theme').on("click", function() {
			var navbartheme = $(this).attr("navbar-theme");
			$('.scoop-navbar').attr("navbar-theme", navbartheme);
        });
    };

	handlenavbartheme();
 /* Navbar Theme Change function Close */

 /* Navbar Theme Change function Start */
	function handleActiveItemTheme() {
		$('.theme-color > a.active-item-theme').on("click", function() {
			var AtciveItemTheme = $(this).attr("active-item-theme");
			$('.scoop-navbar').attr("active-item-theme", AtciveItemTheme);
        });
    };

	handleActiveItemTheme();
 /* Navbar Theme Change function Close */ 
 

 /* Theme background pattren Change function Start */
	function handlethemebgpattern() {
		$('.theme-color > a.themebg-pattern').on("click", function() {
			var themebgpattern = $(this).attr("themebg-pattern");
			$('body').attr("themebg-pattern", themebgpattern);
        });
    };

	handlethemebgpattern();
 /* Theme background pattren Change function Close */
  
 /* Theme Layout Change function start*/
	function handlethemehorizontallayout() {
		$('#theme-layout').val('wide').on('change', function (get_value) {
			get_value = $(this).val();
			$('.scoop').attr('horizontal-layout', get_value);
		});
	};

   handlethemehorizontallayout ();
 /* Theme Layout Change function Close*/
 
 /*Menu Placement change function start*/
   function handleMenuPlacement() {
		$('#navbar-placement').val('top').on('change', function (get_value) {
			get_value = $(this).val();
			$('.scoop').attr('horizontal-placement', get_value); 
		});
	};

   handleMenuPlacement ();
 /*Menu Placement change function Close*/
 
 
 
 /*Item border change function Start*/
	function handleIItemBorder() {
			$('#item-border').change(function() {
				if( $(this).is(":checked")) {
					$('.scoop-navbar .scoop-item').attr('item-border', 'false');
				}else {
					$('.scoop-navbar .scoop-item').attr('item-border', 'true');
				}
			});
		};

   handleIItemBorder ();
 /*Item border change function Close*/
 
 
 /*SubItem border change function Start*/
   function handleSubIItemBorder() {
			$('#subitem-border').change(function() {
				if( $(this).is(":checked")) {
					$('.scoop-navbar .scoop-item').attr('subitem-border', 'false');
				}else {
					$('.scoop-navbar .scoop-item').attr('subitem-border', 'true');
				}
			});
		};

   handleSubIItemBorder ();
 /*SubItem border change function Close*/
 
 
 /*Item border Style change function Start*/
   function handlBoderStyle() {
		$('#border-style').val('solid').on('change', function (get_value) {
			get_value = $(this).val();
			$('.scoop-navbar .scoop-item').attr('item-border-style', get_value);
		});
	};

   handlBoderStyle ();
 /*Item border Style change function Close*/
 
 
 
 
 /*Dropdown Icon change function Start*/
      function handleDropDownIconStyle() {
		$('#dropdown-icon').val('style1').on('change', function (get_value) {
			get_value = $(this).val();
			$('.scoop-navbar .scoop-hasmenu').attr('dropdown-icon', get_value);
		});
	};

   handleDropDownIconStyle ();
 /*Dropdown Icon change function Close*/
 
 
 
 
 
 /* Horizontal Navbar Position change function Start*/
	function handleNavigationPosition() {
			$('#sidebar-position').change(function() {
				if( $(this).is(":checked")) {
					$('.scoop-navbar').attr("scoop-navbar-position", 'fixed' ); 
				}else {
					$('.scoop-navbar').attr("scoop-navbar-position", 'relative' ); 
				}
			});
		};

   handleNavigationPosition ();
   
 /* Horizontal Navbar Position change function Close*/
 /* Hide Show Menu Icon */
 	function handleNavigationMenuIcon() {
			$('#menu-icons').change(function() {
				if( $(this).is(":checked")) {
					$('.scoop .scoop-navbar .scoop-item > li > a .scoop-micon:not(".scoop-search-item .scoop-micon")').hide();
				}else {
					$('.scoop .scoop-navbar .scoop-item > li > a .scoop-micon:not(".scoop-search-item .scoop-micon")').show();
				}
			});
		};

	handleNavigationMenuIcon ();
   /* Hide Show Brand logo */
    function handlescoopBrandVisibility() {
			$('#brand-visibility').change(function() {
				if( $(this).is(":checked")) {
					$('.scoop .scoop-navbar .scoop-brand').hide();
				}else {
					$('.scoop .scoop-navbar .scoop-brand').show();
				}
			});
		};

	handlescoopBrandVisibility (); 
	function handleScoopLeftItemVisibility() {
			$('#leftitem-visibility').change(function() {
				if( $(this).is(":checked")) {
					$('.scoop .scoop-navbar .scoop-item.scoop-left-item').hide();
				}else {
					$('.scoop .scoop-navbar .scoop-item.scoop-left-item').show();
				}
			});
		}; 
	handleScoopLeftItemVisibility ();
	function handleScoopRightItemVisibility() {
			$('#rightitem-visibility').change(function() {
				if( $(this).is(":checked")) {
					$('.scoop .scoop-navbar .scoop-item.scoop-right-item').hide();
				}else {
					$('.scoop .scoop-navbar .scoop-item.scoop-right-item').show();
				}
			});
		}; 
	handleScoopRightItemVisibility ();
	function handleScoopSearchItemVisibility() {
			$('#searchitem-visibility').change(function() {
				if( $(this).is(":checked")) {
					$('.scoop .scoop-navbar .scoop-item.scoop-search-item').hide();
				}else {
					$('.scoop .scoop-navbar .scoop-item.scoop-search-item').show();
				}
			});
		}; 
	handleScoopSearchItemVisibility ();
	
	function handleBrandItemAlign() {
		$('#branditem-align').val('left').on('change', function (get_value) {
			get_value = $(this).val();
			if (get_value === "left"){
				$('.scoop-navbar .scoop-brand').removeClass('scoop-right-align');
				$('.scoop-navbar .scoop-brand').addClass('scoop-left-align');
			}else{
				$('.scoop-navbar .scoop-brand').addClass('scoop-right-align');
				$('.scoop-navbar .scoop-brand').removeClass('scoop-left-align');
			}
		});
	};

   handleBrandItemAlign ();
   function handleLeftItemAlign() {
		$('#leftitem-align').val('left').on('change', function (get_value) {
			get_value = $(this).val();
			if (get_value === "left"){
				$('.scoop-navbar .scoop-left-item').removeClass('scoop-right-align');
				$('.scoop-navbar .scoop-left-item').addClass('scoop-left-align');
			}else{
				$('.scoop-navbar .scoop-left-item').addClass('scoop-right-align');
				$('.scoop-navbar .scoop-left-item').removeClass('scoop-left-align');
			}
		});
	};

   handleLeftItemAlign ();
   function handleRightItemAlign() {
		$('#rightitem-align').val('left').on('change', function (get_value) {
			get_value = $(this).val();
			if (get_value === "left"){
				$('.scoop-navbar .scoop-right-item').removeClass('scoop-right-align');
				$('.scoop-navbar .scoop-right-item').addClass('scoop-left-align');
			}else{
				$('.scoop-navbar .scoop-right-item').addClass('scoop-right-align');
				$('.scoop-navbar .scoop-right-item').removeClass('scoop-left-align');
			}
		});
	};

   handleRightItemAlign ();
   function handleSearchItemAlign() {
		$('#searchitem-align').val('left').on('change', function (get_value) {
			get_value = $(this).val();
			if (get_value === "left"){
				$('.scoop-navbar .scoop-search-item').removeClass('scoop-right-align');
				$('.scoop-navbar .scoop-search-item').addClass('scoop-left-align');
			}else{
				$('.scoop-navbar .scoop-search-item').addClass('scoop-right-align');
				$('.scoop-navbar .scoop-search-item').removeClass('scoop-left-align');
			}
		});
	};

   handleSearchItemAlign ();
});
