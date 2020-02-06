import { Component, OnInit } from '@angular/core';
import * as $ from 'jquery';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  constructor() { }

  ngOnInit() {
    // nav deactivate jquery method
    $(".nav .nav-link").on("click", function () {
      $(".nav").find(".active").removeClass("active");
      $(this).addClass("active");
    }).ready(function () {
      $(".nav").find(".active").removeClass("active");
      $("#home-nav-item").addClass("active");
    });

    // scroll animation jquery method
    $(document).ready(function () {
      $("a").on('click', function (event) {
        if (this.hash !== "") {
          event.preventDefault();
          var hash = this.hash;
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
