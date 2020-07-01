import { Component } from '@angular/core';

@Component({
  selector:'app',
  templateUrl: './app.component.html',
  styleUrls:['../app/app.component.css']
 
})
export class AppComponent {

  constructor() {
    $.fn.extend({
      animateCss: function (animationName: any, callback: any) {
        let animationEnd = (function (el) {
          let animations = {
            animation: 'animationend',
            OAnimation: 'oAnimationEnd',
            MozAnimation: 'mozAnimationEnd',
            WebkitAnimation: 'webkitAnimationEnd',
          };

          for (let t in animations) {
            if (el.style[t] !== undefined) {
              return animations[t];
            }
          }
        })(document.createElement('div'));

        this.addClass('animated ' + animationName).one(animationEnd, function () {
          $(this).removeClass('animated ' + animationName);

          if (typeof callback === 'function') callback();
        });

        return this;
      },
    });
  }
 
}