import { Injectable } from '@nestjs/common';
import { AsyncLocalStorage } from 'node:async_hooks';
import type { Tenant } from '../interfaces';

/**
 * Service for managing tenant context using AsyncLocalStorage
 * This allows tenant information to be accessed anywhere in the request lifecycle
 * without explicitly passing it through the call stack
 */
@Injectable()
export class TenantContextService {
  private readonly storage = new AsyncLocalStorage<Tenant>();

  /**
   * Run a function within a tenant context
   * @param tenant The tenant to set as the current context
   * @param fn The function to run within the tenant context
   * @returns The result of the function
   */
  run<T>(tenant: Tenant, fn: () => T): T {
    return this.storage.run(tenant, fn);
  }

  /**
   * Get the current tenant from the context
   * @returns The current tenant or undefined if not in a tenant context
   */
  getTenant(): Tenant | undefined {
    return this.storage.getStore();
  }

  /**
   * Get the current tenant ID from the context
   * @returns The current tenant ID or undefined if not in a tenant context
   */
  getTenantId(): string | undefined {
    return this.storage.getStore()?.id;
  }

  /**
   * Check if currently running within a tenant context
   * @returns True if in a tenant context, false otherwise
   */
  hasTenant(): boolean {
    return this.storage.getStore() !== undefined;
  }
}
