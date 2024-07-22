import { Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Observable, take } from 'rxjs';
import { Character } from 'src/app/character.inferface';
import { CharacterService } from 'src/app/services/character.service';

@Component({
  selector: 'app-character-details',
  templateUrl: './character-details.component.html',
  styleUrls: ['./character-details.component.css']
})
export class CharacterDetailsComponent implements OnInit {
  character$?: Observable<Character> 
  constructor(private route: ActivatedRoute,
  private characterSvc: CharacterService,
  private location:Location) { }

  ngOnInit(): void {
    this.route.params.pipe(
      take(1)
    ).subscribe(
      ((params)=>{
        const id = params['id'];
        this.character$ = this.characterSvc.getDetails(id);
      })
    )
  }
  onGoBack(){
    this.location.back()
  }

}
