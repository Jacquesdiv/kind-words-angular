import { Component, OnInit } from '@angular/core';
import { kindWords, Sentence } from 'kind-words';

@Component({
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.sass']
})
export class MainComponent implements OnInit {

  public loading: boolean = false;
  public sentence: Sentence = null;

  ngOnInit(): void {
    this.fetchKindWords();
  }

  private async fetchKindWords() {
    this.loading = true;
    try {
      const sentences = await kindWords.fetchKindWords();
      if (sentences.length) {
        const randomIndex = Math.floor(Math.random() * sentences.length);
        this.sentence = sentences[randomIndex];
      }
    } catch (err) {
      // TODO: handle this
    }
    this.loading = false;
  }
}
