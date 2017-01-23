'use strict';

var cx = require('classnames');
var React = require('react');
var ReactDOM = require('react-dom');

var Node = React.createClass({
    displayName: 'UITreeNode',

    renderCollapse: function renderCollapse() {
        var index = this.props.index;

        if (index.children && index.children.length) {
            var collapsed = index.node.collapsed;

            return React.createElement('span', {
                className: cx('collapse', collapsed ? 'caret-right' : 'caret-down'),
                style: { left: (index.left - 1) * 18 },
                onMouseDown: function onMouseDown(e) {
                    e.stopPropagation();
                },
                onClick: this.handleCollapse
            });
        }

        return null;
    },
    renderChildren: function renderChildren() {
        var _this = this;

        var index = this.props.index;
        var tree = this.props.tree;
        var dragging = this.props.dragging;

        if (index.children && index.children.length) {
            var childrenStyles = {};
            if (index.node.collapsed) childrenStyles.display = 'none';
            if (this.props.paddingLeft) childrenStyles['paddingLeft'] = this.props.paddingLeft + 'px';

            return React.createElement(
                'div', { className: 'children', style: childrenStyles },
                index.children.map(function(child) {
                    var childIndex = tree.getIndex(child);
                    return React.createElement(Node, {
                        tree: tree,
                        index: childIndex,
                        key: childIndex.id,
                        dragabled: _this.props.dragabled,
                        dragging: dragging,
                        paddingLeft: _this.props.paddingLeft,
                        onCollapse: _this.props.onCollapse,
                        onDragStart: _this.props.onDragStart
                    });
                })
            );
        }

        return null;
    },
    componentDidUpdate: function componentDidUpdate(prevProps, prevState) {
        var dom = this.refs.inner;
        if (dom.getElementsByClassName('is-active').length > 0) {
            dom.classList.add('active');
        } else {
            dom.classList.remove('active');
        }
    },
    render: function render() {
        var tree = this.props.tree;
        var index = this.props.index;
        var dragging = this.props.dragging;
        var node = index.node;
        var styles = {};

        return React.createElement(
            'div', {
                className: cx('m-node', {
                    'placeholder': index.id === dragging
                }),
                style: styles
            },
            React.createElement(
                'div', { className: 'inner', ref: 'inner' },
                this.renderCollapse(),
                tree.renderNode(node)
            ),
            this.renderChildren()
        );
    },
    handleCollapse: function handleCollapse(e) {
        e.stopPropagation();
        var nodeId = this.props.index.id;
        if (this.props.onCollapse) this.props.onCollapse(nodeId);
    },
    handleMouseDown: function handleMouseDown(e) {
        if (!this.props.dragabled) {
            return;
        }
        var nodeId = this.props.index.id;
        var dom = this.refs.inner;

        if (this.props.onDragStart) {
            this.props.onDragStart(nodeId, dom, e);
        }
    }
});

module.exports = Node;