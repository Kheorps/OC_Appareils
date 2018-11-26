import { Component, OnInit } from '@angular/core';
import { AppareilService } from '../services/appareil.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-singleappareil',
  templateUrl: './singleappareil.component.html',
  styleUrls: ['./singleappareil.component.scss']
})
export class SingleAppareilComponent implements OnInit {

  // tslint:disable-next-line:no-inferrable-types
  name: string = 'Appareil';
  // tslint:disable-next-line:no-inferrable-types
  status: string = 'éteint';

  constructor(
    private appareilService: AppareilService,
    private router: ActivatedRoute
  ) { }

  ngOnInit() {
    const id = this.router.snapshot.params['id'];
    // +id = cast id en nombre
    this.name = this.appareilService.getAppareilById(+id).name;
    this.status = this.appareilService.getAppareilById(+id).status;
  }

}
