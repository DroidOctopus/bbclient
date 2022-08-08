import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { BbService } from './bb.service';

@Component({
  selector: 'app-bb-detail',
  templateUrl: './bb-detail.component.html',
  styleUrls: ['./bb-detail.component.css']
})
export class BbDetailComponent implements OnInit {
  public bb: any;
  public comments!: any;
  public author: String = '';
  public password: String = '';
  public content: String = '';

  getComments() {
    this.bbservice.getComments(this.bb.id).subscribe(
      (comments: any) => {this.comments = comments;}
    );
  }
  submitComment() {
    this.bbservice.addComment(this.bb.id, this.author, this.password,
      this.content).subscribe((comment: any) => {
        if (comment) {
          this.content = '';
          this.getComments();
        }
      });
  }

  constructor(private bbservice: BbService,
    private ar: ActivatedRoute) { }

  ngOnInit(): void {
    const pk = this.ar.snapshot.params['pk'];
    this.bbservice.getBb(pk).subscribe((bb: any) => {
      this.bb = bb;
      this.getComments();
    });
  }

}
