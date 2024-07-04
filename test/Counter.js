// Tests goes here
const { expect } = require('chai');
const { ethers } = require('hardhat');


describe('counter', () => {
    let counter;

    beforeEach(async() => {
        const Counter = await ethers.getContractFactory('Counter');
        counter = await Counter.deploy('MyCounter', 1);
    })

    describe('Deployment', () => {
        it('sets the initial count', async () => {
            expect(await counter.count()).to.equal(1);
        })
    
        it('sets the initial name', async () => {
            expect(await counter.name()).to.equal('MyCounter');
        })
    })

    describe('Counting', () => {
        let transaction;

        //Reads the count
        it('reads the count from the "count" public variable', async () => {
            expect(await counter.count()).to.equal(1);
        })

        it('reads the count from the "getCount()" public variable', async () => {
            expect(await counter.count()).to.equal(1);
        })

        //Count handling
        it('increments the count', async () => {
            transaction = await counter.increment();
            await transaction.wait();

            expect(await counter.count()).to.equal(2);

            transaction = await counter.increment();
            await transaction.wait();

            expect(await counter.count()).to.equal(3);
        })

        it('decrements the counter', async () => {
            transaction = await counter.decrement();
            await transaction.wait();

            expect(await counter.count()).to.equal(0);

            // Cannot decrement count bellow 0
            await expect(counter.decrement()).to.be.reverted
        })

        //Reads the name
        it('reads the name from the "name" public variable', async () => {
            expect(await counter.name()).to.equal('MyCounter');
        })

        it('reads the count from the "getName()" public variable', async () => {
            expect(await counter.name()).to.equal('MyCounter');
        })

        //Name handling
        it('sets the name', async () => {
            transaction = await counter.setName('Andrei s counter');
            await transaction.wait();

            expect(await counter.name()).to.equal('Andrei s counter');
        })

        it('updates the name', async () => {
            transaction = await counter.setName('New Name');
            await transaction.wait();

            expect(await counter.name()).to.equal('New Name');
        })
    })

})