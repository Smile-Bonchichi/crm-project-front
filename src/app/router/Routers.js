import MainPage from "../../pages/main/MainPage";
import SaleOfProductsPage from "../../pages/sale-of-products/SaleOfProductsPage";
import BudgetPage from "../../pages/budget/BudgetPage";
import EmployeePage from "../../pages/employee/EmployeePage";
import JobTitlePage from "../../pages/job-title/JobTitlePage";
import ProductionPage from "../../pages/production/ProductionPage";
import PurchaseRawMaterialsPage from "../../pages/purchase-raw-materials/PurchaseRawMaterialsPage";
import RawMaterialsPage from "../../pages/raw-materials/RawMaterialsPage";
import UnitsPage from "../../pages/units/UnitsPage";
import FinishedProductionPage from "../../pages/finished-production/FinishedProductionPage";
import IngredientsPage from "../../pages/ingredients/IngredientsPage";

export const RouterUrl = {
    SALE_OF_PRODUCTS_PAGE: '/sale-of-product',
    BUDGET_PAGE: '/budget',
    EMPLOYEE_PAGE: '/employee',
    JOB_TITLE_PAGE: '/job-title',
    PRODUCTION_PAGE: '/production',
    PURCHASE_RAW_MATERIALS_PAGE: '/purchase-raw-materials',
    RAW_MATERIALS_PAGE: '/raw-materials',
    UNITS_PAGE: '/units',
    FINISHED_PRODUCTION_PAGE: '/finished-production',
    INGREDIENTS_PAGE: '/ingredients',

}

export const routers = [
    { url: '/', element: <MainPage/> },
    { url: RouterUrl.SALE_OF_PRODUCTS_PAGE, element: <SaleOfProductsPage/> },
    { url: RouterUrl.BUDGET_PAGE, element: <BudgetPage/> },
    { url: RouterUrl.EMPLOYEE_PAGE, element: <EmployeePage/> },
    { url: RouterUrl.JOB_TITLE_PAGE, element: <JobTitlePage/> },
    { url: RouterUrl.PRODUCTION_PAGE, element: <ProductionPage/> },
    { url: RouterUrl.PURCHASE_RAW_MATERIALS_PAGE, element: <PurchaseRawMaterialsPage/> },
    { url: RouterUrl.RAW_MATERIALS_PAGE, element: <RawMaterialsPage/> },
    { url: RouterUrl.UNITS_PAGE, element: <UnitsPage/> },
    { url: RouterUrl.FINISHED_PRODUCTION_PAGE, element: <FinishedProductionPage/> },
    { url: RouterUrl.INGREDIENTS_PAGE, element: <IngredientsPage/> }
];
