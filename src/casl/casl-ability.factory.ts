import {
    Ability,
    AbilityBuilder,
    AbilityClass,
    InferSubjects,
} from "@casl/ability";
import { Action } from "enums/auth/auth.enum";

class User {
    id: number;
    isAdmin: boolean;
}

class Article {
    id: number;
    isPublished: boolean;
    authorId: string;
}

type Subjects = InferSubjects<typeof Article | typeof User> | "all";

export type AppAbility = Ability<[Action, Subjects]>;
export class CaslAbilityFactory {
    createForUser(user: User) {
        const { can, cannot, build } = new AbilityBuilder<
            Ability<[Action, Subjects]>
        >(Ability as AbilityClass<AppAbility>);

        if (user.isAdmin) {
            can(Action.MANAGE, "all");
        } else {
            can(Action.READ, "all");
        }

        can(Action.UPDATE, Article, { authorId: user.id });
        cannot(Action.DELETE, Article, { isPublished: true });
        return build({
            detectSubjectType: (item) => item.constructor,
        });
    }
}
