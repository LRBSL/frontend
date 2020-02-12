import { Component, OnInit, Input } from '@angular/core';

interface theme {
  header_classes: string;
  title: string;
}

@Component({
  selector: 'app-alert-box',
  templateUrl: './alert-box.component.html',
  styleUrls: ['./alert-box.component.css']
})
export class AlertBoxComponent implements OnInit {

  @Input() type: string;
  @Input() content: string;
  themes: Array<theme> = new Array<theme>();
  current_theme: theme;

  constructor() {
    this.themes["error"] = { header_classes: "bg-danger text-white", title: "ERROR ALERT" };
    this.themes["warning"] = { header_classes: "bg-warning text-white", title: "WARNING ALERT" };
    this.themes["success"] = { header_classes: "bg-success text-white", title: "SUCCESS ALERT" };
  }

  ngOnInit() {
  }

  setHeaderStyles(): string {
    if (this.type != null && this.type != undefined) {
      this.current_theme = this.themes[this.type];
    } else {
      this.current_theme = this.themes["error"];
    }
    return "modal-header " + this.current_theme.header_classes;
  }
}
