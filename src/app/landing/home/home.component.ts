import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/auth/auth.service';
declare var $: any;
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  alreadyLogin = false;

  constructor(private authService: AuthService) { }

  ngOnInit() {
    this.alreadyLogin = this.authService.currentUserValue;
    let particles = document.querySelectorAll('.particle');
    particles.forEach(function (particle) {
      let animate = Math.floor(Math.random() * (25 - 5) + 5);
      let left = Math.floor(Math.random() * 100);
      let dimensions = Math.floor(Math.random() * (100 - 40) + 40);
      let delay = Math.floor(Math.random() * (3 - 1) + 1);

      particle['style']['left'] = left + '%';
      particle['style'].setProperty('--animation-time', animate + 's');
      particle['style'].width = dimensions + 'px';
      particle['style'].height = dimensions + 'px';
      particle['style'].animationDelay = delay + 's';
    });



    $(".features_click").click(function () {
      $('html,body').animate({
        scrollTop: $(".feature_sec").offset().top
      },
        'slow');
    });

    //typewrite
    var TxtType = function (el, toRotate, period) {
      this.toRotate = toRotate;
      this.el = el;
      this.loopNum = 0;
      this.period = parseInt(period, 10) || 1000;
      this.txt = '';
      this.tick();
      this.isDeleting = false;
    };

    TxtType.prototype.tick = function () {
      var i = this.loopNum % this.toRotate.length;
      var fullTxt = this.toRotate[i];
      if (this.isDeleting) {
        this.txt = fullTxt.substring(0, this.txt.length - 1);
      } else {
        this.txt = fullTxt.substring(0, this.txt.length + 1);
      }
      this.el.innerHTML = '<span class="wrap">' + this.txt + '</span>';

      var that = this;
      var delta = 200 - Math.random() * 100;

      if (this.isDeleting) { delta /= 2; }

      if (!this.isDeleting && this.txt === fullTxt) {
        delta = this.period;
        this.isDeleting = true;
      } else if (this.isDeleting && this.txt === '') {
        this.isDeleting = false;
        this.loopNum++;
        delta = 500;
      }
      setTimeout(function () {
        that.tick();
      }, delta);
    };


    $(document).ready(function(){
      var elements = document.getElementsByClassName('typewrite');
      for (var i = 0; i < elements.length; i++) {
        var toRotate = elements[i].getAttribute('data-type');
        var period = elements[i].getAttribute('data-period');
        if (toRotate) {
          new TxtType(elements[i], JSON.parse(toRotate), period);
        }
      }
      // INJECT CSS
      var css = document.createElement("style");
      css.type = "text/css";
      css.innerHTML = ".typewrite > .wrap { border-right: 0.08em solid #0a9618}";
      document.body.appendChild(css);  
    })

    // window.onload = function () {
    //   var elements = document.getElementsByClassName('typewrite');
    //   for (var i = 0; i < elements.length; i++) {
    //     var toRotate = elements[i].getAttribute('data-type');
    //     var period = elements[i].getAttribute('data-period');
    //     if (toRotate) {
    //       new TxtType(elements[i], JSON.parse(toRotate), period);
    //     }
    //   }
    //   // INJECT CSS
    //   var css = document.createElement("style");
    //   css.type = "text/css";
    //   css.innerHTML = ".typewrite > .wrap { border-right: 0.08em solid #0a9618}";
    //   document.body.appendChild(css);
    // };

  }

  // toggleShow() {
  //   this.isShown = this.isShown;
  // }
}
