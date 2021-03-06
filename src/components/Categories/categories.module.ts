import {Module} from "@nestjs/common";
import {CategoriesController} from "./categories.controller";
import {CategoriesService} from "./categories.service";
import { MongooseModule } from '@nestjs/mongoose';
import {CategoriesSchema } from './categories.model';

@Module({
    imports: [MongooseModule.forFeature([{name:'Categories',schema: CategoriesSchema}])],
    controllers:[CategoriesController],
    providers: [CategoriesService],
    exports:[CategoriesService]
})
export class CategoriesModule {

}
