// Module
export { MultiTenantModule } from './multi-tenant.module';

// Services
export { TenantContextService } from './services';

// Middleware
export { TenantMiddleware } from './middleware';

// Guards
export { REQUIRE_TENANT_KEY, TenantGuard } from './guards';

// Decorators
export { CurrentTenant, RequireTenant, TenantId } from './decorators';

// Interfaces
export type {
  CustomTenantExtractor,
  MultiTenantModuleAsyncOptions,
  MultiTenantModuleOptions,
  Tenant,
  TenantExtractionStrategy,
  TenantResolver,
} from './interfaces';

// Constants
export {
  DEFAULT_TENANT_HEADER,
  DEFAULT_TENANT_PATH_INDEX,
  DEFAULT_TENANT_QUERY_PARAM,
  MULTI_TENANT_OPTIONS,
} from './constants';
