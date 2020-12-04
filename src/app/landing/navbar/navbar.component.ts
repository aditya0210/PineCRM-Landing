import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/auth/auth.service';
declare var $: any;
@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {
  alreadyLogin = false;
  constructor(
    private authService: AuthService
  ) { }

  ngOnInit() {
    this.alreadyLogin = this.authService.currentUserValue;
  
    //navbar hide on down and up in show
    $(document).ready(function() {
      'use strict';
      var c, currentScrollTop = 0,
      navbar = $('nav');
      $(window).scroll(function() {
          var a = $(window).scrollTop();
          var b = navbar.height();
          currentScrollTop = a;
          if (c < currentScrollTop && a > b + b) {
              navbar.addClass("scrollUp");
          } else if (c > currentScrollTop && !(a <= b)) {
              navbar.removeClass("scrollUp");
          }
          c = currentScrollTop;
      });
  });
  
      
        function header_main() {
          if ($('.cust_manage').length) {
            var windowayn = $(window).scrollTop();
            var aynHeader = $('.cust_manage');
            var scrollayn = $('.scroll_top');
            if (windowayn >= 20) {
              aynHeader.addClass('fixed-header');
              $('.nav_cust').addClass('manage_effect');
              $('.navbar-brand').addClass('manage_logo');
              scrollayn.fadeIn(300);
            } else {
              aynHeader.removeClass('fixed-header');
              $('.nav_cust').removeClass('manage_effect');
              $('.navbar-brand').removeClass('manage_logo');
              scrollayn.fadeOut(300);
            }
          }
        }
  
  
      window.onload = function() {
      $(window).on('scroll', function() {
        header_main();
    });
  }
  
    }
  
    logOut(){
      this.authService.logOut();
    }
  }
  