import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AnnoncesResComponent } from './annonces-res.component';

describe('AnnoncesResComponent', () => {
  let component: AnnoncesResComponent;
  let fixture: ComponentFixture<AnnoncesResComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AnnoncesResComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(AnnoncesResComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
