// Longer intro copy shown in the curriculum accordion, distinct from the
// shorter phase.description pulled from the DB (used for meta descriptions
// and JSON-LD). This gives search engines real prose to rank long-tail
// queries against — see Airborne SEO Report, Priority 4.
export const phaseIntros: Record<string, string> = {
  'phase-1-junior-it-support':
    "You'll get handed connectivity problems the way a junior IT support tech actually does — a coworker says the wifi's down, a printer won't take an IP, someone plugged into the wrong VLAN. Subnetting and the OSI model stop being theory once you're the one fixing it.",
  'phase-2-junior-network-engineer':
    'This is where you actually build networks instead of just describing them — VLANs, OSPF, ACLs, NAT, all inside Packet Tracer, the same tool CCNA candidates use to practice for the real exam.',
  'phase-3-packet-level-troubleshooter':
    "Wireshark captures replace guesswork — you'll actually see the TCP handshake, the retransmissions, the failed connection, instead of assuming what's wrong. Then a first Python script that logs into a device instead of you doing it by hand.",
  'phase-4-specialize-telecom-5g':
    "If telecom interests you more than enterprise IT, this is where that split actually starts — mobile network architecture, taught through the University of Helsinki's Core 5G and Beyond MOOC, not a repackaged version of it.",
}
