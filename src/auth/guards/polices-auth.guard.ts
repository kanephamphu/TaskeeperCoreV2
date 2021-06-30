import { CanActivate, ExecutionContext, Injectable } from "@nestjs/common";
import { Reflector } from "@nestjs/core";
import { CaslAbilityFactory } from "casl/casl-ability.factory";
import { Observable } from "rxjs";

@Injectable()
export class PoliciesGuard implements CanActivate {
    constructor(
        private reflector: Reflector,
        private caslAbilityFactory: CaslAbilityFactory
    ) {}
    canActivate(
        context: ExecutionContext
    ): boolean | Promise<boolean> | Observable<boolean> {
        throw new Error("Method not implemented.");
    }

    // async canActivate(context: ExecutionContext): Promise<boolean> {
    //     const policyHandlers =
    //         this.reflector.get<PolicyHandler[]>(
    //             CHECK_POLICIES_KEY,
    //             context.getHandler()
    //         ) || [];

    //     const { user } = context.switchToHttp().getRequest();
    //     const ability = this.caslAbilityFactory.createForUser(user);

    //     return policyHandlers.every((handler) =>
    //         this.execPolicyHandler(handler, ability)
    //     );
    // }

    // private execPolicyHandler(handler: PolicyHandler, ability: AppAbility) {
    //     if (typeof handler === "function") {
    //         return handler(ability);
    //     }
    //     return handler.handle(ability);
    // }
}
