"use strict";

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

/*jshint esversion:6*/
var contentNode = document.getElementById('contents');

var ItemFilter = function (_React$Component) {
    _inherits(ItemFilter, _React$Component);

    function ItemFilter() {
        _classCallCheck(this, ItemFilter);

        return _possibleConstructorReturn(this, (ItemFilter.__proto__ || Object.getPrototypeOf(ItemFilter)).apply(this, arguments));
    }

    _createClass(ItemFilter, [{
        key: "render",
        value: function render() {
            return React.createElement(
                "div",
                null,
                "hmm"
            );
        }
    }]);

    return ItemFilter;
}(React.Component);

var ItemRow = function ItemRow(props) {
    return React.createElement(
        "tr",
        null,
        React.createElement(
            "td",
            null,
            props.item._id
        ),
        React.createElement(
            "td",
            null,
            props.item.name
        ),
        React.createElement(
            "td",
            null,
            props.item.quantity
        ),
        React.createElement(
            "td",
            null,
            props.item.rate
        )
    );
};

function ItemTable(props) {
    var itemRows = props.items.map(function (item) {
        return React.createElement(ItemRow, { key: item._id, item: item });
    });
    return React.createElement(
        "table",
        { className: "bordered-table" },
        React.createElement(
            "thead",
            null,
            React.createElement(
                "tr",
                null,
                React.createElement(
                    "th",
                    null,
                    "ID"
                ),
                React.createElement(
                    "th",
                    null,
                    "Name"
                ),
                React.createElement(
                    "th",
                    null,
                    "Quantity"
                ),
                React.createElement(
                    "th",
                    null,
                    "Rate"
                )
            )
        ),
        React.createElement(
            "tbody",
            null,
            itemRows
        )
    );
}

var ItemAdd = function (_React$Component2) {
    _inherits(ItemAdd, _React$Component2);

    function ItemAdd() {
        _classCallCheck(this, ItemAdd);

        return _possibleConstructorReturn(this, (ItemAdd.__proto__ || Object.getPrototypeOf(ItemAdd)).call(this));
        // this.handleSubmit = this.handleSubmit.bind(this);
    }
    // handleSubmit(e){
    //     e.preventDefault();
    //     var form = document.forms.itemAdd;
    //     this.props.createItem({
    //         name : form.name.value,
    //         quantity : form.quantity.value,
    //         rate : form.rate.value,
    //     });
    //     //Clear the form
    //     form.name.value = '';
    //     form.quantity.value = '';
    //     form.rate.value = '';
    // }


    _createClass(ItemAdd, [{
        key: "render",
        value: function render() {
            return React.createElement(
                "div",
                null,
                React.createElement(
                    "form",
                    { name: "itemAdd" },
                    React.createElement("input", { type: "text", name: "name", placeholder: "Name" }),
                    React.createElement("input", { type: "text", name: "quantity", placeholder: "Quantity" }),
                    React.createElement("input", { type: "text", name: "rate", placeholder: "Rate" }),
                    React.createElement(
                        "button",
                        null,
                        "Add Item"
                    )
                )
            );
        }
    }]);

    return ItemAdd;
}(React.Component);

var ItemList = function (_React$Component3) {
    _inherits(ItemList, _React$Component3);

    function ItemList() {
        _classCallCheck(this, ItemList);

        var _this3 = _possibleConstructorReturn(this, (ItemList.__proto__ || Object.getPrototypeOf(ItemList)).call(this));

        _this3.state = { items: [] };
        // this.createItem = this.createItem.bind(this);
        return _this3;
    }

    _createClass(ItemList, [{
        key: "componentDidMount",
        value: function componentDidMount() {
            console.log("onme");
            this.loadData();
        }
    }, {
        key: "loadData",
        value: function loadData() {
            var _this4 = this;

            console.log('tired');
            // const newItem1 = {_id: 420,name: 'Ayush',quantity:100,rate:40,};
            // const newItem2 = {_id: 5330,name: 'Aysh',quantity:10,rate:50,};
            // const newItem = this.state.items.concat(newItem1).concat(newItem2);
            // this.setState({items: newItem});
            fetch('/api/items').then(function (response) {
                return response.json();
            }).then(function (data) {
                //console.log("Total count:", data._metadata.total);
                console.log("All good here");
                _this4.setState({ items: data.records });
            }).catch(function (err) {
                console.log(err);
            });
        }

        // createItem(newItem){
        //     fetch('/api/items',{
        //         method: 'POST',
        //         headers: {'Content-Type': 'application/json'},
        //         body : JSON.stringify(newItem),
        //     }).then(response => response.json()).then(updatedItem => {
        //            const newItems  = this.state.items.concat(updatedItem);
        //            this.setState({items:newItems});
        //     }).catch(err =>{
        //         alert("Error in sending data to server" + err.message);
        //     })
        // }

    }, {
        key: "render",
        value: function render() {
            return React.createElement(
                "div",
                null,
                React.createElement(
                    "h4",
                    null,
                    "Welcome to ItemList"
                ),
                React.createElement(ItemFilter, null),
                React.createElement("hr", null),
                React.createElement(ItemTable, { items: this.state.items }),
                React.createElement("hr", null),
                React.createElement(ItemAdd, null)
            );
        }
    }]);

    return ItemList;
}(React.Component);

ReactDOM.render(React.createElement(ItemList, null), contentNode);