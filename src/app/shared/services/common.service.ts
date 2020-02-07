import { Injectable } from '@angular/core';
import * as $ from 'jquery';

@Injectable({
  providedIn: 'root'
})
export class CommonService {

  constructor() { }

  public setNavDeactive() {
    // nav deactivate jquery method
    $(document).on("click", ".nav .nav-link", function () {
      $(".nav").find(".active").removeClass("active");
      $(this).addClass("active");
    }).ready(function () {
      let route = window.location.pathname.split("/")[2];
      if (route == undefined || route.length == 0) {
        $(".nav").find(".active").removeClass("active");
        $("#home-nav-item").addClass("active");
      }
    });
  }

  public setScrollPageAnimation() {
    // scroll animation jquery method
    $(document).ready(function () {
      $("a").on('click', function (event) {
        if (this.hash !== "") {
          event.preventDefault();
          let hash = this.hash;
          $('html, body').animate({
            scrollTop: $(hash).offset().top
          }, 800, function () {
            window.location.hash = hash;
          });
        }
      });
    });
  }
}
