import { describe, it, expect, beforeEach, vi } from 'vitest';
import { ExecutionContext, HttpException } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { TenantGuard, REQUIRE_TENANT_KEY } from './tenant.guard';
import { TenantContextService } from '../services';

describe('TenantGuard', () => {
  let guard: TenantGuard;
  let reflector: Reflector;
  let tenantContext: TenantContextService;
  let mockExecutionContext: ExecutionContext;

  beforeEach(() => {
    reflector = new Reflector();
    tenantContext = new TenantContextService();
    guard = new TenantGuard(reflector, tenantContext);

    mockExecutionContext = {
      getHandler: vi.fn(),
      getClass: vi.fn(),
      switchToHttp: vi.fn().mockReturnValue({
        getRequest: vi.fn().mockReturnValue({}),
      }),
    } as unknown as ExecutionContext;
  });

  describe('canActivate', () => {
    it('should allow access when @RequireTenant is not applied', () => {
      vi.spyOn(reflector, 'getAllAndOverride').mockReturnValue(undefined);

      const result = guard.canActivate(mockExecutionContext);

      expect(result).toBe(true);
    });

    it('should allow access when @RequireTenant is false', () => {
      vi.spyOn(reflector, 'getAllAndOverride').mockReturnValue(false);

      const result = guard.canActivate(mockExecutionContext);

      expect(result).toBe(true);
    });

    it('should throw when @RequireTenant is true but no tenant context', () => {
      vi.spyOn(reflector, 'getAllAndOverride').mockReturnValue(true);

      expect(() => guard.canActivate(mockExecutionContext)).toThrow(HttpException);
    });

    it('should allow access when @RequireTenant is true and tenant exists', () => {
      vi.spyOn(reflector, 'getAllAndOverride').mockReturnValue(true);

      const result = tenantContext.run({ id: 'tenant-1' }, () => {
        return guard.canActivate(mockExecutionContext);
      });

      expect(result).toBe(true);
    });

    it('should check both handler and class for metadata', () => {
      const getAllAndOverrideSpy = vi.spyOn(reflector, 'getAllAndOverride').mockReturnValue(false);

      guard.canActivate(mockExecutionContext);

      expect(getAllAndOverrideSpy).toHaveBeenCalledWith(REQUIRE_TENANT_KEY, [
        mockExecutionContext.getHandler(),
        mockExecutionContext.getClass(),
      ]);
    });
  });
});

