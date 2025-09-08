import { Component } from '@angular/core';

@Component({
  selector: 'app-async-demo',
  imports: [],
  templateUrl: './async-demo.html',
  styleUrl: './async-demo.css',
})
export class AsyncDemoComponent {
  async delay(ms: number) {
    return await new Promise((resolve) => setTimeout(resolve, ms));
  }
  btnClick() {
    this.normalFunction('1' + new Date());
    this.normalFunction('2' + new Date());

    this.delay(2000).then(() => {
      console.log('3 ' + new Date());
      this.delay(2000).then(() => {
        console.log('4 ' + new Date());
        this.delay(2000).then(() => {
          console.log('5 ' + new Date());
        });
      });
    });

    console.log('6 ' + new Date());
  }
  normalFunction(text: string) {
    console.log(text);
  }
}
