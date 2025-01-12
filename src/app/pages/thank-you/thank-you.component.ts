import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import confetti from 'canvas-confetti';

@Component({
  selector: 'app-thank-you',
  templateUrl: './thank-you.component.html',
  styleUrls: ['./thank-you.component.css']
})
export class ThankYouComponent implements OnInit {
  name: string | null = '';
  message: string | null = '';

  constructor(private route: ActivatedRoute, private router: Router) {}

  ngOnInit(): void {
    this.name = this.route.snapshot.paramMap.get('name');
    this.message = this.route.snapshot.paramMap.get('message');
    this.launchConfetti();
    this.playSound();
  }


  goBackToHome() {
    this.router.navigate(['/']); 
  }

  launchConfetti(): void {
    confetti({
      particleCount: 200,
      spread: 90,
      origin: { x: 0.5, y: 0.5 }
    });
  }
  playSound(): void {
    const audio = new Audio('assets/success-sound.mp3');
    audio.play();
  }

}
