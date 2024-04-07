const hre = require("hardhat")

const tokens = (n) => {
  return ethers.utils.parseUnits(n.toString(), 'ether')
}

async function main() {
  // Setup accounts & variables
  const [deployer] = await ethers.getSigners()
  const NAME = "TokenForTickets"
  const SYMBOL = "TTT"

  // Deploy contract
  const TicketToken = await ethers.getContractFactory("TicketToken")
  const ticketToken = await TicketToken.deploy(NAME, SYMBOL)
  await ticketToken.deployed()

  console.log(`Deployed TicketToken Contract at: ${ticketToken.address}\n`)

  // List 6 events
  const occasions = [
    {
      name: "Certified Blockchain Associate Toronto",
      cost: tokens(2),
      tickets: 0,
      date: "January 31",
      time: "3:00PM WST",
      location: "ScotiaBank Arena - Toronto"
    },
    {
      name: "Bitcoin Development Toronto",
      cost: tokens(0.5),
      tickets: 125,
      date: "February 15",
      time: "9:00AM EST",
      location: "Toronto, Canada"
    },
    {
      name: "Blockchain Security Torotno",
      cost: tokens(0.2),
      tickets: 200,
      date: "January 9",
      time: "10:00AM EST",
      location: "Toronto, Canada"
    },
    {
      name: "PolkaDot Conference Toronto",
      cost: tokens(3),
      tickets: 0,
      date: "January 11",
      time: "2:30PM EST",
      location: "Toronto, Canada"
    },
    {
      name: "UniSwap DEX Toronto",
      cost: tokens(1.5),
      tickets: 125,
      date: "January 23",
      time: "7:00PM EST",
      location: "Toronto, Canada"
    }
  ]

  for (var i = 0; i < 5; i++) {
    const transaction = await ticketToken.connect(deployer).list(
      occasions[i].name,
      occasions[i].cost,
      occasions[i].tickets,
      occasions[i].date,
      occasions[i].time,
      occasions[i].location,
    )

    await transaction.wait()

    console.log(`Listed Event ${i + 1}: ${occasions[i].name}`)
  }
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});


