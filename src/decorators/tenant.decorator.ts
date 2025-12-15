import { createParamDecorator } from '@nestjs/common';
import type { ExecutionContext } from '@nestjs/common';
import type { Tenant } from '../interfaces';

/**
 * Parameter decorator to inject the current tenant into a controller method
 *
 * @example
 * ```typescript
 * @Get('profile')
 * getProfile(@CurrentTenant() tenant: Tenant) {
 *   return this.service.getProfile(tenant.id);
 * }
 * ```
 */
export const CurrentTenant = createParamDecorator(
  (_data: unknown, ctx: ExecutionContext): Tenant | undefined => {
    const request = ctx.switchToHttp().getRequest<{ tenant?: Tenant }>();
    return request.tenant;
  },
);

/**
 * Parameter decorator to inject only the current tenant ID into a controller method
 *
 * @example
 * ```typescript
 * @Get('profile')
 * getProfile(@TenantId() tenantId: string) {
 *   return this.service.getProfile(tenantId);
 * }
 * ```
 */
export const TenantId = createParamDecorator(
  (_data: unknown, ctx: ExecutionContext): string | undefined => {
    const request = ctx.switchToHttp().getRequest<{ tenant?: Tenant }>();
    return request.tenant?.id;
  },
);
