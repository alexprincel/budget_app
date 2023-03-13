import "./App.css";
import Button from "react-bootstrap/Button";
import Col from "react-bootstrap/Col";
import Container from "react-bootstrap/Container";
import Form from "react-bootstrap/Form";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import Table from "react-bootstrap/Table";
import Row from "react-bootstrap/Row";
import "bootstrap/dist/css/bootstrap.min.css";
import React from "react";

function getMaxOfKey(dict_list, key) {
	let maxValue = 0;
	for (const dict of dict_list) {
		if (dict[key] > maxValue) {
			maxValue = dict[key];
		}
	}
	return maxValue;
}

function calculateBudgetVariance(budget_amount, real_amount) {
	return Math.round(budget_amount - real_amount, 2);
}

class BudgetLine extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			budget_variance: calculateBudgetVariance(
				this.props.budget_amount,
				this.props.real_amount
			),
		};
		this.onBudgetChange = this.onBudgetChange.bind(this);
	}

	onBudgetChange(event) {
		this.setState({
			budget_variance: calculateBudgetVariance(
				event.target.value,
				this.props.real_amount
			),
		});
	}

	render() {
		return (
			<tr>
				<th className="budget_item_name">{this.props.item_name}</th>
				<th>
					<input
						type="number"
						className="budget_item_budget numeric_value"
						onChange={this.onBudgetChange}
						defaultValue={this.props.budget_amount}
					/>
				</th>
				<th className="budget_item_real numeric_value">
					{this.props.real_amount}
				</th>
				<th
					className={`budget_variance numeric_value ${
						this.state.budget_variance >= 0
							? "positive"
							: "negative"
					}`}
				>
					{this.state.budget_variance}
				</th>
			</tr>
		);
	}
}

class BudgetGrid extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			budget_add_item_visible: "false",
			newLineItem: "",
			budget_lines: [
				{
					budget_item_name: "Revenue",
					budget_item_budget: "1250",
					budget_item_real: "1150",
					sort_order: 1,
				},
				{
					budget_item_name: "Cat",
					budget_item_budget: "100",
					budget_item_real: "50",
					sort_order: 2,
				},
				{
					budget_item_name: "Mortgage",
					budget_item_budget: "2000",
					budget_item_real: "1000",
					sort_order: 3,
				},
				{
					budget_item_name: "Utilities",
					budget_item_budget: "165",
					budget_item_real: "150",
					sort_order: 4,
				},
				{
					budget_item_name: "Home Insurance",
					budget_item_budget: "100",
					budget_item_real: "95.8",
					sort_order: 5,
				},
			],
		};

		this.onBudgetItemAddClick = this.onBudgetItemAddClick.bind(this);
		this.handleAddBudgetItem = this.handleAddBudgetItem.bind(this);
	}

	handleAddBudgetItem(event) {
		let newMaxSortOrder =
			getMaxOfKey(this.state.budget_lines, "sort_order") + 1;
		this.setState((state) => {
			const list = state.budget_lines.concat({
				budget_item_name: this.state.newLineItem,
				budget_item_budget: "0",
				budget_item_real: "0",
				sort_order: newMaxSortOrder,
			});
			return { budget_lines: list, budget_add_item_visible: "false" };
		});
	}

	onBudgetItemAddClick = () => {
		this.setState({
			budget_add_item_visible:
				this.state.budget_add_item_visible === "true"
					? "false"
					: "true",
		});
	};

	render() {
		return (
			<Container>
				<Row>
					<Col md="auto">
						<Table hover size="sm">
							<thead>
								<tr>
									<th>Line Item</th>
									<th>Budget Amount</th>
									<th>Spent Amount</th>
									<th>Budget Variance</th>
								</tr>
							</thead>
							<tbody>
								{this.state.budget_lines.map((item, index) => (
									<BudgetLine
										key={index}
										item_name={item.budget_item_name}
										budget_amount={item.budget_item_budget}
										real_amount={item.budget_item_real}
									/>
								))}
							</tbody>
						</Table>
						<Form isvisible={this.state.budget_add_item_visible}>
							<Form.Group
								className="mb-3"
								controlId="formLineItem"
							>
								<Form.Control
									type="text"
									placeholder="Enter line item name"
									onChange={(e) =>
										this.setState({
											newLineItem: e.target.value,
										})
									}
								/>
							</Form.Group>
							<Button
								variant="primary"
								onClick={this.handleAddBudgetItem}
							>
								Confirm
							</Button>
						</Form>
						<Button
							variant="primary"
							onClick={this.onBudgetItemAddClick}
						>
							Add Item
						</Button>
					</Col>
				</Row>
			</Container>
		);
	}
}

function SideBar() {
	return (
		<div id="sidebar">
			<ul>
				<li>Summary</li>
				<li>Detailed</li>
				<li>Transactions</li>
			</ul>
		</div>
	);
}

class PagePicker extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			picked_page: "summary",
			page_visibility: {
				summary: "true",
				detailed: "false",
				transactions: "false",
			},
		};
	}

	render() {
		return <BudgetGrid />;
	}
}

function App() {
	return (
		<div className="App">
			<Navbar bg="light" expand="lg">
				<Container>
					<Navbar.Brand href="#home">Budget App</Navbar.Brand>
					<Navbar.Toggle aria-controls="basic-navbar-nav" />
					<Navbar.Collapse id="basic-navbar-nav">
						<Nav className="me-auto">
							<Nav.Link href="#home">Home</Nav.Link>
						</Nav>
					</Navbar.Collapse>
				</Container>
			</Navbar>
			<div id="page">
				<SideBar />
				<BudgetGrid />
			</div>
		</div>
	);
}

export default App;
