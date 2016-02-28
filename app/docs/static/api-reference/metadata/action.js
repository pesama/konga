/**
@ngdoc function
@name Metadata.Action
@description

An action defines a custom, modular behavior to be injected somewhere in your app. This definitions cover the metadata part of the actions. To see how to implement these custom pieces, see the {@link Customisation.Action-driven Action-driven framework} documentation.

@param {string} name
Unique name of the action


@param {string} [label=null]
Label for the action. <span title="Translateable"><i class="fa fa-language"></i></span>


@param {string} [icon=null]
Defines an icon to be rendered next to the label. Technically it's just a css class, you have to do the icon part yourself.

@param {Object} scope
<span class="label type-hint type-hint-object">{@link Metadata.FormScopes FormScope}</span>
Scope where the action will be rendered.

@param {string} [overrides=null]
Used only on `overrideDefaults` actions. It's the name of the action to override.

*/