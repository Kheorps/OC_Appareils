import { Component, OnInit, Input } from '@angular/core';
import { AppareilService } from '../services/appareil.service';

@Component({
  selector: 'app-appareil',
  templateUrl: './appareil.component.html',
  styleUrls: ['./appareil.component.scss']
})
export class AppareilComponent implements OnInit {

  // tslint:disable-next-line:no-inferrable-types
  @Input() id: number;
  // tslint:disable-next-line:no-inferrable-types
  @Input() appareilName: string;
  // tslint:disable-next-line:no-inferrable-types
  @Input() appareilStatus: string;
  @Input() index: number;

  constructor(
    private appareilService: AppareilService
  ) { }

  ngOnInit() {
  }

  public getStatus() {
    return this.appareilStatus;
  }

  getColor() {
    return (this.appareilStatus === 'allumé') ? 'green' : 'red';
  }

  onSwitch() {
    (this.appareilStatus === 'allumé') ? this.appareilService.switchOffOne(this.index) : this.appareilService.switchOnOne(this.index);
  }
}
