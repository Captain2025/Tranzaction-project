// transactions.json
const transactions = [
    {
        transaction_id: "1",
        transaction_date: "2019-01-01",
        transaction_amount: "100.00",
        transaction_type: "debit",
        transaction_description: "Payment for groceries",
        merchant_name: "SuperMart",
        card_type: "Visa",
    },
    {
        transaction_id: "2",
        transaction_date: "2019-01-02",
        transaction_amount: "50.00",
        transaction_type: "credit",
        transaction_description: "Refund for overcharge",
        merchant_name: "RefundCo",
        card_type: "MasterCard",
    },
    // Добавления других транзакций по аналогии
];

// index.js
class Transaction {
    constructor(transaction_id, transaction_date, transaction_amount, transaction_type, transaction_description, merchant_name, card_type) {
        this.transaction_id = transaction_id;
        this.transaction_date = transaction_date;
        this.transaction_amount = transaction_amount;
        this.transaction_type = transaction_type;
        this.transaction_description = transaction_description;
        this.merchant_name = merchant_name;
        this.card_type = card_type;
    }

    string() {
        return JSON.stringify(this);
    }
}

class TransactionAnalyzer {
    constructor(transactions) {
        this.transactions = transactions.map(transaction => new Transaction(
            transaction.transaction_id,
            transaction.transaction_date,
            transaction.transaction_amount,
            transaction.transaction_type,
            transaction.transaction_description,
            transaction.merchant_name,
            transaction.card_type
        ));
    }

    addTransaction(transaction) {
        this.transactions.push(transaction);
    }

    getAllTransactions() {
        return this.transactions;
    }

    getUniqueTransactionTypes() {
        const types = new Set();
        this.transactions.forEach(transaction => types.add(transaction.transaction_type));
        return Array.from(types);
    }

    calculateTotalAmount() {
        return this.transactions.reduce((total, transaction) => total + parseFloat(transaction.transaction_amount), 0);
    }

    calculateTotalAmountByDate(year, month, day) {
        const filteredTransactions = this.transactions.filter(transaction => {
            const date = new Date(transaction.transaction_date);
            return (
                (!year || date.getFullYear() === year) &&
                (!month || date.getMonth() + 1 === month) &&
                (!day || date.getDate() === day)
            );
        });

        return filteredTransactions.reduce((total, transaction) => total + parseFloat(transaction.transaction_amount), 0);
    }

    getTransactionsByType(type) {
        return this.transactions.filter(transaction => transaction.transaction_type === type);
    }

    getTransactionsInDateRange(startDate, endDate) {
        startDate = new Date(startDate);
        endDate = new Date(endDate);
        return this.transactions.filter(transaction => {
            const date = new Date(transaction.transaction_date);
            return date >= startDate && date <= endDate;
        });
    }

    getTransactionsByMerchant(merchantName) {
        return this.transactions.filter(transaction => transaction.merchant_name === merchantName);
    }

    calculateAverageTransactionAmount() {
        const totalAmount = this.calculateTotalAmount();
        return totalAmount / this.transactions.length;
    }

    getTransactionsByAmountRange(minAmount, maxAmount) {
        return this.transactions.filter(transaction => {
            const amount = parseFloat(transaction.transaction_amount);
            return amount >= minAmount && amount <= maxAmount;
        });
    }

    calculateTotalDebitAmount() {
        const debitTransactions = this.getTransactionsByType('debit');
        return debitTransactions.reduce((total, transaction) => total + parseFloat(transaction.transaction_amount), 0);
    }

    findMostTransactionsMonth() {
        const months = {};
        this.transactions.forEach(transaction => {
            const month = new Date(transaction.transaction_date).getMonth() + 1;
            months[month] = (months[month] || 0) + 1;
        });

        let mostMonth = null;
        let maxTransactions = 0;
        for (const month in months) {
            if (months[month] > maxTransactions) {
                mostMonth = month;
                maxTransactions = months[month];
            }
        }

        return mostMonth;
    }

    findMostDebitTransactionMonth() {
        const debitTransactions = this.getTransactionsByType('debit');
        const months = {};
        debitTransactions.forEach(transaction => {
            const month = new Date(transaction.transaction_date).getMonth() + 1;
            months[month] = (months[month] || 0) + 1;
        });

        let mostMonth = null;
        let maxTransactions = 0;
        for (const month in months) {
            if (months[month] > maxTransactions) {
                mostMonth = month;
                maxTransactions = months[month];
            }
        }

        return mostMonth;
    }

    mostTransactionTypes() {
        const debitCount = this.getTransactionsByType('debit').length;
        const creditCount = this.getTransactionsByType('credit').length;

        if (debitCount > creditCount) return 'debit';
        if (debitCount < creditCount) return 'credit';
        return 'equal';
    }

    getTransactionsBeforeDate(date) {
        date = new Date(date);
        return this.transactions.filter(transaction => new Date(transaction.transaction_date) < date);
    }

    findTransactionById(id) {
        return this.transactions.find(transaction => transaction.transaction_id === id);
    }

    mapTransactionDescriptions() {
        return this.transactions.map(transaction => transaction.transaction_description);
    }
}

const analyzer = new TransactionAnalyzer(transactions);

// Пример использования методов класса TransactionAnalyzer
console.log(analyzer.getUniqueTransactionTypes());
console.log(analyzer.calculateTotalAmount());
console.log(analyzer.calculateTotalAmountByDate(2019, 1, 1));
console.log(analyzer.getTransactionsByType('debit'));
console.log(analyzer.getTransactionsInDateRange('2019-01-01', '2019-01-02'));
console.log(analyzer.getTransactionsByMerchant('SuperMart'));
console.log(analyzer.calculateAverageTransactionAmount());
console.log(analyzer.getTransactionsByAmountRange(50, 100));
console.log(analyzer.calculateTotalDebitAmount());
console.log(analyzer.findMostTransactionsMonth());
console.log(analyzer.findMostDebitTransactionMonth());
console.log(analyzer.mostTransactionTypes());
console.log(analyzer.getTransactionsBeforeDate('2019-01-02'));
console.log(analyzer.findTransactionById('1'));
console.log(analyzer.mapTransactionDescriptions());