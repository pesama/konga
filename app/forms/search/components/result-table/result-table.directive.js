/**
 * @ngdoc directive
 * @name konga.directive:resultTable
 * @scope
 * @restrict E
 * @description

 The `resulTable` is in change of result rendering, into an interactive data table. It generates a column layout using the configuration set up in the {@link Metadata.Field `fields' metadata`}.

 <img src="/static/result-table-init.png" width="50%" class="center">

 Fields and categories' metadata are fetched, to determine the column layout to generate. If you configured any field to be rendered as {@link Metadata.FieldTypes#properties_COMPLEX `complex`}, another process is needed, who splits up your root field into all the inner fields you need for your layout.

 # Form Type

 You can customize the appeareance of your table, by setting up the property `formType` of the {@link Metadata.Field field's metadata}, for {@link Metadata.FormScopes#properties_RESULTS `results`} form scope. There are built-in views to render category headers on top of the fields.

 # Sorting

 If {@link Metadata.Field field's metadata} configures the field as `sortable`, a dropdown/caret will show on table header to allow user to launch sorting. The `resultTable` calls the `submitSorting` method of the {@link konga.controller:EntitySearchController `EntitySearchController`} with the sorting field and mode, and the controller handles it from there.


 @param {Object} metadata
 Defines the metadata of the entity whose results are being rendered.

 @param {Array} entities
 The results themselves

 @param {function()} updateEntity
 Function to call when a row is clicked, if no {@link Customisation.Action-driven#properties_result-click custom action} has been defined for that purpose and the entity's metadata is defined as `editable`.

 @param {function()} submitSorting
 Function to call when sorting field or mode changes
 */
import ResultTableComponentController from './result-table.controller';

class ResultTableComponent {
    constructor() {
        this.templateUrl = '/konga/views/result-table.html';
        this.replace = true;
        this.restrict = 'E';
        this.scope = {
            entityMetadata: '=',
            entities: '=',
            updateEntity: '=onUpdate',
            submitSorting: '=onSorting'
        };

        this.util = util;
        this.mapper = mapper;
        this.$filter = $filter;
        this.$rootScope = $rootScope;
        this.permissionManager = permissionManager;

        this.controller = ResultTableComponentController;
    }

    static getInstance() {
        ResultTableComponent.instance = new ResultTableComponent();
        return ResultTableComponent.instance;
    }
}

export default ResultTableComponent;
