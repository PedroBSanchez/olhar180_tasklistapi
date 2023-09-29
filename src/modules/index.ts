import { AuthModule } from './auth/auth.module';
import { TasksModule } from './tasks/tasks.module';
import { UsersModule } from './users/users.module';

const modules = [TasksModule, UsersModule, AuthModule];

export default modules;
