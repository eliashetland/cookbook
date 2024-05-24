import { IRecipe } from "./Recipe";


export enum SortBy {
    NEWEST = 0,
    OLDEST = 1,
    MOSTPOPULAR = 2,
    LEASTPOPULAR = 3,
    ATOZ = 4,
    ZTOA = 5,
}



export class SortByClass{



    public static sort(sortBy: SortBy, arr:IRecipe[]): IRecipe[] {
        switch (sortBy) {
            case SortBy.NEWEST:
                return arr.sort((a, b) => {
                    return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
                });
            case SortBy.OLDEST:
                return arr.sort((a, b) => {
                    return new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime();
                });
            case SortBy.MOSTPOPULAR:
                return arr.sort((a, b) => {
                    return b.views - a.views;
                });
            case SortBy.LEASTPOPULAR:
                return arr.sort((a, b) => {
                    return a.views - b.views;
                });
            case SortBy.ATOZ:
                return arr.sort((a, b) => {
                    return a.title.localeCompare(b.title);
                });
            case SortBy.ZTOA:
                return arr.sort((a, b) => {
                    return b.title.localeCompare(a.title);
                });
            default:
                return arr;
        }



    }


}