import { getDb } from '@/lib/db'
import { roadmapPhases, roadmapTasks } from '@/lib/db/schema'

type SeedTask = {
  id: string
  title: string
  scenario: string
  resources: { label: string; url: string; type: 'free' | 'paid' }[]
  order: number
}

type SeedPhase = {
  id: string
  title: string
  description: string
  order: number
  tasks: SeedTask[]
}

// Migrated from the original 16-week, 1hr/day markdown roadmap.
// Each week's daily scenarios are folded into one task per day within a phase.
export const seedPhases: SeedPhase[] = [
  {
    id: 'phase-1-junior-it-support',
    title: 'Phase 1 — You just got hired as junior IT support',
    description:
      'Weeks 1-3. Walk into any small office and explain or fix basic connectivity without flinching.',
    order: 1,
    tasks: [
      {
        id: 'p1-w1-d1',
        title: 'Why nothing connects',
        scenario:
          'A coworker says "the wifi is down" but their laptop shows full bars. Figure out why "connected" does not mean "working."',
        resources: [
          { label: "Professor Messer's Network+ series", url: 'https://www.professormesser.com/', type: 'free' },
        ],
        order: 1,
      },
      {
        id: 'p1-w1-d2',
        title: 'Switch or hub, and why it matters',
        scenario: 'A new office is being set up. You need to decide between a switch and a hub.',
        resources: [{ label: 'Switching basics primer', url: 'https://www.professormesser.com/', type: 'free' }],
        order: 2,
      },
      {
        id: 'p1-w1-d3',
        title: 'Why routers exist at all',
        scenario:
          'IT wants to know why Layer 3 devices ("routers") exist when switches already move data.',
        resources: [],
        order: 3,
      },
      {
        id: 'p1-w1-d4',
        title: 'IP addressing basics',
        scenario:
          'A printer has an IP like 192.168.1.45, and nothing works when someone types 300.168.1.45 by mistake.',
        resources: [],
        order: 4,
      },
      {
        id: 'p1-w1-d5',
        title: 'First subnetting intro',
        scenario: 'You are told to split this network into 4 smaller ones.',
        resources: [],
        order: 5,
      },
      {
        id: 'p1-w2-d1',
        title: 'The subnetting gauntlet begins',
        scenario: 'A client wants exactly 30 usable IPs per department.',
        resources: [],
        order: 6,
      },
      {
        id: 'p1-w2-d2',
        title: 'Small subnets',
        scenario: 'The same client now wants 6 usable IPs for a tiny branch office.',
        resources: [],
        order: 7,
      },
      {
        id: 'p1-w2-d3',
        title: 'Reverse-engineering a subnet mask',
        scenario: 'You are handed a network diagram with no subnet mask and told to reverse-engineer it.',
        resources: [],
        order: 8,
      },
      {
        id: 'p1-w2-d4',
        title: 'VLAN concept',
        scenario: 'Someone plugs a laptop into the wrong VLAN and cannot reach the internet.',
        resources: [],
        order: 9,
      },
      {
        id: 'p1-w3-d1',
        title: 'The traffic detective — DNS',
        scenario: 'A website "will not load" — is it DNS, is it the site, or is it you?',
        resources: [],
        order: 10,
      },
      {
        id: 'p1-w3-d2',
        title: 'DHCP lease process',
        scenario: 'A device "cannot get an IP address" after a router reboot.',
        resources: [],
        order: 11,
      },
      {
        id: 'p1-w3-d3',
        title: 'NAT basics',
        scenario: "Someone's laptop can ping the router but not the internet.",
        resources: [],
        order: 12,
      },
      {
        id: 'p1-w3-d4',
        title: 'ICMP vs TCP/HTTP',
        scenario: 'A support ticket says "ping works, browsing does not."',
        resources: [],
        order: 13,
      },
      {
        id: 'p1-w3-d5',
        title: 'First Wireshark capture',
        scenario: 'Install Wireshark and capture your own home traffic for 5 minutes.',
        resources: [{ label: 'Wireshark', url: 'https://www.wireshark.org/', type: 'free' }],
        order: 14,
      },
    ],
  },
  {
    id: 'phase-2-junior-network-engineer',
    title: 'Phase 2 — You are the new junior network engineer',
    description: 'Weeks 4-9. CCNA-level skills, hands-on in Packet Tracer, not just theory.',
    order: 2,
    tasks: [
      {
        id: 'p2-w4-d1',
        title: 'Build your first network',
        scenario: 'Install Cisco Packet Tracer. Build a 2-PC, 1-switch network.',
        resources: [{ label: 'Cisco Packet Tracer', url: 'https://www.netacad.com/courses/packet-tracer', type: 'free' }],
        order: 1,
      },
      {
        id: 'p2-w4-d2',
        title: 'First VLAN',
        scenario: 'A client wants 2 departments that cannot see each other\'s traffic.',
        resources: [],
        order: 2,
      },
      {
        id: 'p2-w4-d3',
        title: 'Basic router config',
        scenario: 'Connect those VLANs to the internet via a router.',
        resources: [],
        order: 3,
      },
      {
        id: 'p2-w4-d4',
        title: 'Inter-VLAN routing',
        scenario: 'A device in VLAN 10 needs to talk to a device in VLAN 20.',
        resources: [],
        order: 4,
      },
      {
        id: 'p2-w5-d1',
        title: 'Static routing basics',
        scenario: 'Two routers, two networks — neither knows the other exists.',
        resources: [],
        order: 5,
      },
      {
        id: 'p2-w5-d2',
        title: 'Why dynamic routing exists',
        scenario: 'Add a third router — static routes get messy fast.',
        resources: [],
        order: 6,
      },
      {
        id: 'p2-w5-d3',
        title: 'OSPF basics',
        scenario: "A client's network keeps changing — routes need to update automatically.",
        resources: [],
        order: 7,
      },
      {
        id: 'p2-w5-d4',
        title: 'OSPF lab',
        scenario: 'Three routers, single area, hands-on OSPF config.',
        resources: [],
        order: 8,
      },
      {
        id: 'p2-w6-d1',
        title: 'ACL concepts',
        scenario: 'A client wants the Sales VLAN blocked from reaching Finance.',
        resources: [],
        order: 9,
      },
      {
        id: 'p2-w6-d2',
        title: 'Standard ACL practice',
        scenario: 'Configure that exact ACL in Packet Tracer.',
        resources: [],
        order: 10,
      },
      {
        id: 'p2-w6-d3',
        title: 'Extended ACL practice',
        scenario: 'Now allow only HTTP traffic through, block everything else.',
        resources: [],
        order: 11,
      },
      {
        id: 'p2-w7-d1',
        title: 'NAT/PAT overload',
        scenario: 'The whole office needs internet through one public IP.',
        resources: [],
        order: 12,
      },
      {
        id: 'p2-w7-d2',
        title: 'Static NAT / port forwarding',
        scenario: 'A specific server needs to be reachable from outside.',
        resources: [],
        order: 13,
      },
      {
        id: 'p2-w7-d3',
        title: 'WAN concepts',
        scenario: 'A client asks: "what is the difference between our WAN and LAN setup?"',
        resources: [],
        order: 14,
      },
      {
        id: 'p2-w8-d1',
        title: 'IPv6 addressing basics',
        scenario: 'A new client mandates IPv6 support.',
        resources: [],
        order: 15,
      },
      {
        id: 'p2-w8-d2',
        title: 'Wireless standards',
        scenario: 'An office wants secure wifi for 50 employees.',
        resources: [],
        order: 16,
      },
      {
        id: 'p2-w9-practice',
        title: 'CCNA exam-style practice',
        scenario: 'Daily timed practice question sets, review wrong answers same day.',
        resources: [{ label: 'Free CCNA question banks', url: 'https://www.boson.com/practice-exam/ccna-200-301-practice-exam', type: 'free' }],
        order: 17,
      },
    ],
  },
  {
    id: 'phase-3-packet-level-troubleshooter',
    title: 'Phase 3 — You are now the packet-level troubleshooter',
    description: 'Weeks 10-11. Wireshark depth and basic network automation.',
    order: 3,
    tasks: [
      {
        id: 'p3-w10-d1',
        title: 'Normal browsing capture',
        scenario: 'Capture a normal web browsing session and identify the TCP handshake.',
        resources: [],
        order: 1,
      },
      {
        id: 'p3-w10-d2',
        title: 'Failed connection capture',
        scenario: 'Capture a failed connection attempt and spot retransmissions/resets.',
        resources: [],
        order: 2,
      },
      {
        id: 'p3-w10-d3',
        title: 'DNS lookups in real time',
        scenario: 'Capture DNS lookups and filter/read queries and responses.',
        resources: [],
        order: 3,
      },
      {
        id: 'p3-w11-d1',
        title: 'Why automation matters',
        scenario: 'Manually configuring 20 switches would take all day — there is a better way.',
        resources: [{ label: 'Netmiko docs', url: 'https://github.com/ktbyers/netmiko', type: 'free' }],
        order: 4,
      },
      {
        id: 'p3-w11-d2',
        title: 'First netmiko script',
        scenario: 'Write a script that logs into one device and pulls its config.',
        resources: [],
        order: 5,
      },
      {
        id: 'p3-w11-d3',
        title: 'Push a config via script',
        scenario: 'Push a config change to a device via script instead of manually.',
        resources: [],
        order: 6,
      },
    ],
  },
  {
    id: 'phase-4-specialize-telecom-5g',
    title: 'Phase 4 — Specialize: Telecom/5G track',
    description: 'Weeks 12-16. Mobile network fundamentals through the Core 5G and Beyond MOOC.',
    order: 4,
    tasks: [
      {
        id: 'p4-w12',
        title: 'Mobile network fundamentals',
        scenario: 'Explain to non-technical stakeholders why phones "hand off" between towers.',
        resources: [
          {
            label: 'Core 5G and Beyond MOOC',
            url: 'https://courses.mooc.fi/org/uh-cs/courses/5g-mooc/',
            type: 'free',
          },
        ],
        order: 1,
      },
      {
        id: 'p4-w13',
        title: '4G as the foundation for 5G',
        scenario: 'A carrier is deciding whether to upgrade legacy 4G infrastructure.',
        resources: [],
        order: 2,
      },
      {
        id: 'p4-w14-16',
        title: '5G architecture and exercises',
        scenario: 'Work through remaining MOOC chapters and exercises at your own pace.',
        resources: [],
        order: 3,
      },
    ],
  },
]

export async function seed() {
  const db = getDb()

  for (const phase of seedPhases) {
    await db
      .insert(roadmapPhases)
      .values({
        id: phase.id,
        title: phase.title,
        order: phase.order,
        description: phase.description,
      })
      .onConflictDoNothing()

    for (const task of phase.tasks) {
      await db
        .insert(roadmapTasks)
        .values({
          id: task.id,
          phaseId: phase.id,
          title: task.title,
          scenario: task.scenario,
          resources: task.resources,
          order: task.order,
        })
        .onConflictDoNothing()
    }
  }
}
