import { Injectable, CanActivate, ExecutionContext, HttpException, HttpStatus } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { TenantContextService } from '../services';

/**
 * Metadata key for requiring tenant
 */
export const REQUIRE_TENANT_KEY = 'requireTenant';

/**
 * Guard that ensures a valid tenant context exists for the request
 * Use with @RequireTenant() decorator on controllers or methods
 */
@Injectable()
export class TenantGuard implements CanActivate {
  constructor(
    private readonly reflector: Reflector,
    private readonly tenantContext: TenantContextService,
  ) {}

  canActivate(context: ExecutionContext): boolean {
    const requireTenant = this.reflector.getAllAndOverride<boolean>(REQUIRE_TENANT_KEY, [
      context.getHandler(),
      context.getClass(),
    ]);

    // If @RequireTenant() is not applied, allow the request
    if (!requireTenant) {
      return true;
    }

    // Check if tenant context exists
    if (!this.tenantContext.hasTenant()) {
      throw new HttpException('Tenant context required', HttpStatus.FORBIDDEN);
    }

    return true;
  }
}

