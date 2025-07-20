import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CountUserComponent } from './count-user.component';

describe('CountUserComponent', () => {
  let component: CountUserComponent;
  let fixture: ComponentFixture<CountUserComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [CountUserComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(CountUserComponent);
    component = fixture.componentInstance;
  });

  it('debería crear el componente correctamente', () => {
    expect(component).toBeTruthy();
  });

  it('debería inicializar el conteo en 0 si no se pasa un valor', () => {
    fixture.detectChanges();
    expect(component.count).toBe(0);
  });

  it('debería mostrar el conteo cuando se pasa un valor como @Input', () => {
    component.count = 5;
    fixture.detectChanges();
    const compiled = fixture.nativeElement as HTMLElement;
    expect(compiled.textContent).toContain('5');
  });
});
