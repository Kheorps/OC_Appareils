import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { AppareilService } from '../services/appareil.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-editappareil',
  templateUrl: './editappareil.component.html',
  styleUrls: ['./editappareil.component.scss']
})
export class EditappareilComponent implements OnInit {

  defaultOnOff = 'éteint';

  constructor(
    private appareilService: AppareilService,
    private router: Router
  ) { }

  ngOnInit() {
  }

  onSubmit(form: NgForm) {
    const name = form.value['name'];
    const status = form.value['status'];
    this.appareilService.addAppareil(name, status);
    this.router.navigate(['/appareils']);
  }
}
