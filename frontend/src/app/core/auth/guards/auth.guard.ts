import { inject } from '@angular/core';
import { CanActivateChildFn, Router } from '@angular/router';
import { AuthService } from '../services/auth.service';

export const authGuard: CanActivateChildFn = async () => {
  const authService = inject(AuthService);

  return authService.isAuthenticated();
};
