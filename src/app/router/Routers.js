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
    MAIN_PAGE: { url: '/', name: 'Main page' },
    SALE_OF_PRODUCTS_PAGE: { url: '/sale-of-products', name: 'Sale of products' },
    BUDGET_PAGE: { url: '/budget', name: 'Budget' },
    EMPLOYEE_PAGE: { url: '/employee', name: 'Employee' },
    JOB_TITLE_PAGE: { url: '/job-title', name: 'Job title' },
    PRODUCTION_PAGE: { url: '/production', name: 'Production' },
    PURCHASE_RAW_MATERIALS_PAGE: { url: '/purchase-raw-materials', name: 'Purchase raw materials' },
    RAW_MATERIALS_PAGE: { url: '/raw-materials', name: 'Raw materials' },
    UNITS_PAGE: { url: '/units', name: 'Units' },
    FINISHED_PRODUCTION_PAGE: { url: '/finished-production', name: 'Finished production' },
    INGREDIENTS_PAGE: { url: '/ingredients', name: 'Ingredients' },
}

export const routers = [
    { url: RouterUrl.MAIN_PAGE, element: <MainPage/> },
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
