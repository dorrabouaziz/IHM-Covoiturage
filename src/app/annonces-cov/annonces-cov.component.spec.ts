import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AnnoncesCovComponent } from './annonces-cov.component';

describe('AnnoncesCovComponent', () => {
  let component: AnnoncesCovComponent;
  let fixture: ComponentFixture<AnnoncesCovComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AnnoncesCovComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(AnnoncesCovComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
