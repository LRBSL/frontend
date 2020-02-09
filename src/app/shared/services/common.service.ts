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

    // nav deactivate jquery method for get service button
    $(document).on("click", "#service-btn", function () {
      $(".nav").find(".active").removeClass("active");
      $("#service-nav-item").addClass("active");
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

  public loadStyle(doc: Document, styleName: string) {
    const head = doc.getElementsByTagName('head')[0];

    let themeLink = doc.getElementById(
      'bootstrap-theme'
    ) as HTMLLinkElement;
    if (themeLink) {
      themeLink.href = styleName;
    } else {
      const style = doc.createElement('link');
      style.id = 'bootstrap-theme';
      style.rel = 'stylesheet';
      style.href = `${styleName}`;

      head.appendChild(style);
    }
  }

  public toggleSideBar() {
    $("#sidebarToggle, #sidebarToggleTop").on('click', function (e) {
      $("body").toggleClass("sidebar-toggled");
      $(".sidebar").toggleClass("toggled");
      if ($(".sidebar").hasClass("toggled")) {
        // $('.sidebar .collapse').collapse('hide');
      };
    });
  }
}
