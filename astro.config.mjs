// @ts-check
import { defineConfig } from 'astro/config';
import starlight from '@astrojs/starlight';

// https://astro.build/config
export default defineConfig({
	site: 'https://basehub.org',
	integrations: [
		starlight({
			title: 'BaseHub',
			logo: {
				src: './src/assets/basehub-logo.png',
			},
			customCss: ['./src/styles/homepage.css'],
			head: [
				{
					tag: 'script',
					attrs: {
						async: true,
						defer: true,
						src: 'https://scripts.simpleanalyticscdn.com/latest.js',
					},
				},
				{
					tag: 'noscript',
					content: '<img src="https://queue.simpleanalyticscdn.com/noscript.gif" alt="" referrerpolicy="no-referrer-when-downgrade" />',
				},
			],
			social: [
				{ icon: 'github', label: 'GitHub', href: 'https://github.com/base/base' },
				{ icon: 'discord', label: 'Discord', href: 'https://discord.gg/buildonbase' },
			],
			editLink: {
				baseUrl: 'https://github.com/wbnns/basehub/edit/main/',
			},
			sidebar: [
				{
					label: 'Architecture',
					items: [
						{ label: 'Overview', slug: 'architecture/overview' },
						{ label: 'Crate Graph', slug: 'architecture/crate-graph' },
						{ label: 'Execution Pipeline', slug: 'architecture/execution-pipeline' },
						{ label: 'Flashblocks Pipeline', slug: 'architecture/flashblocks-pipeline' },
					],
				},
				{
					label: 'Getting Started',
					items: [
						{ label: 'Prerequisites', slug: 'getting-started/prerequisites' },
						{ label: 'Building', slug: 'getting-started/building' },
						{ label: 'Docker', slug: 'getting-started/docker' },
						{ label: 'Running', slug: 'getting-started/running' },
						{ label: 'Development', slug: 'getting-started/development' },
						{ label: 'Devnet', slug: 'getting-started/devnet' },
					],
				},
				{
					label: 'Crate Reference',
					items: [
						{ label: 'Overview', slug: 'crates/overview' },
						{
							label: 'alloy',
							collapsed: true,
							items: [
								{ label: 'Overview', slug: 'crates/alloy/overview' },
								{ label: 'consensus', slug: 'crates/alloy/consensus' },
								{ label: 'evm', slug: 'crates/alloy/evm' },
								{ label: 'hardforks', slug: 'crates/alloy/hardforks' },
								{ label: 'network', slug: 'crates/alloy/network' },
								{ label: 'provider', slug: 'crates/alloy/provider' },
								{ label: 'rpc-jsonrpsee', slug: 'crates/alloy/rpc-jsonrpsee' },
								{ label: 'rpc-types-engine', slug: 'crates/alloy/rpc-types-engine' },
								{ label: 'rpc-types', slug: 'crates/alloy/rpc-types' },
							],
						},
						{
							label: 'builder',
							collapsed: true,
							items: [
								{ label: 'Overview', slug: 'crates/builder/overview' },
								{ label: 'core', slug: 'crates/builder/core' },
								{ label: 'metering', slug: 'crates/builder/metering' },
								{ label: 'publish', slug: 'crates/builder/publish' },
							],
						},
						{
							label: 'client',
							collapsed: true,
							items: [
								{ label: 'Overview', slug: 'crates/client/overview' },
								{ label: 'cli', slug: 'crates/client/cli' },
								{ label: 'engine', slug: 'crates/client/engine' },
								{ label: 'flashblocks-node', slug: 'crates/client/flashblocks-node' },
								{ label: 'flashblocks', slug: 'crates/client/flashblocks' },
								{ label: 'metering', slug: 'crates/client/metering' },
								{ label: 'proofs', slug: 'crates/client/proofs' },
								{ label: 'txpool-tracing', slug: 'crates/client/txpool-tracing' },
							],
						},
						{
							label: 'consensus',
							collapsed: true,
							items: [
								{ label: 'Overview', slug: 'crates/consensus/overview' },
								{ label: 'cli', slug: 'crates/consensus/cli' },
								{ label: 'derive', slug: 'crates/consensus/derive' },
								{ label: 'disc', slug: 'crates/consensus/disc' },
								{ label: 'engine', slug: 'crates/consensus/engine' },
								{ label: 'genesis', slug: 'crates/consensus/genesis' },
								{ label: 'gossip', slug: 'crates/consensus/gossip' },
								{ label: 'hardforks', slug: 'crates/consensus/hardforks' },
								{ label: 'macros', slug: 'crates/consensus/macros' },
								{ label: 'peers', slug: 'crates/consensus/peers' },
								{ label: 'protocol', slug: 'crates/consensus/protocol' },
								{ label: 'providers-alloy', slug: 'crates/consensus/providers-alloy' },
								{ label: 'registry', slug: 'crates/consensus/registry' },
								{ label: 'rpc', slug: 'crates/consensus/rpc' },
								{ label: 'service', slug: 'crates/consensus/service' },
								{ label: 'sources', slug: 'crates/consensus/sources' },
							],
						},
						{
							label: 'execution',
							collapsed: true,
							items: [
								{ label: 'Overview', slug: 'crates/execution/overview' },
								{ label: 'chainspec', slug: 'crates/execution/chainspec' },
								{ label: 'cli', slug: 'crates/execution/cli' },
								{ label: 'consensus', slug: 'crates/execution/consensus' },
								{ label: 'evm', slug: 'crates/execution/evm' },
								{ label: 'exex', slug: 'crates/execution/exex' },
								{ label: 'hardforks', slug: 'crates/execution/hardforks' },
								{ label: 'node', slug: 'crates/execution/node' },
								{ label: 'payload', slug: 'crates/execution/payload' },
								{ label: 'primitives', slug: 'crates/execution/primitives' },
								{ label: 'reth', slug: 'crates/execution/reth' },
								{ label: 'rpc', slug: 'crates/execution/rpc' },
								{ label: 'storage', slug: 'crates/execution/storage' },
								{ label: 'trie', slug: 'crates/execution/trie' },
								{ label: 'txpool', slug: 'crates/execution/txpool' },
							],
						},
						{
							label: 'infra',
							collapsed: true,
							items: [
								{ label: 'Overview', slug: 'crates/infra/overview' },
								{ label: 'audit', slug: 'crates/infra/audit' },
								{ label: 'basectl', slug: 'crates/infra/basectl' },
								{ label: 'based', slug: 'crates/infra/based' },
								{ label: 'ingress-rpc', slug: 'crates/infra/ingress-rpc' },
								{ label: 'mempool-rebroadcaster', slug: 'crates/infra/mempool-rebroadcaster' },
								{ label: 'system-tests', slug: 'crates/infra/system-tests' },
								{ label: 'websocket-proxy', slug: 'crates/infra/websocket-proxy' },
							],
						},
						{
							label: 'proof',
							collapsed: true,
							items: [
								{ label: 'Overview', slug: 'crates/proof/overview' },
								{ label: 'driver', slug: 'crates/proof/driver' },
								{ label: 'executor', slug: 'crates/proof/executor' },
								{ label: 'mpt', slug: 'crates/proof/mpt' },
								{ label: 'preimage', slug: 'crates/proof/preimage' },
								{ label: 'proof', slug: 'crates/proof/proof' },
								{ label: 'std-fpvm', slug: 'crates/proof/std-fpvm' },
								{ label: 'std-fpvm-proc', slug: 'crates/proof/std-fpvm-proc' },
							],
						},
						{
							label: 'shared',
							collapsed: true,
							items: [
								{ label: 'Overview', slug: 'crates/shared/overview' },
								{ label: 'access-lists', slug: 'crates/shared/access-lists' },
								{ label: 'bundles', slug: 'crates/shared/bundles' },
								{ label: 'cli-utils', slug: 'crates/shared/cli-utils' },
								{ label: 'engine-ext', slug: 'crates/shared/engine-ext' },
								{ label: 'jwt', slug: 'crates/shared/jwt' },
								{ label: 'node', slug: 'crates/shared/node' },
								{ label: 'primitives', slug: 'crates/shared/primitives' },
								{ label: 'reth-rpc-types', slug: 'crates/shared/reth-rpc-types' },
								{ label: 'txpool-rpc', slug: 'crates/shared/txpool-rpc' },
							],
						},
					],
				},
				{
					label: 'Specifications',
					items: [
						{ label: 'Flashblocks', slug: 'specifications/flashblocks' },
						{ label: 'Access Lists (FAL)', slug: 'specifications/access-lists' },
					],
				},
				{
					label: 'Integration Guides',
					items: [
						{ label: 'Flashblocks RPC', slug: 'integration-guides/flashblocks-rpc' },
						{ label: 'Metering RPC', slug: 'integration-guides/metering-rpc' },
						{ label: 'Transaction Pool', slug: 'integration-guides/txpool' },
						{ label: 'Connecting to Base', slug: 'integration-guides/connecting' },
					],
				},
				{
					label: 'Node Operations',
					items: [
						{ label: 'Deployment', slug: 'node-operations/deployment' },
						{ label: 'Docker', slug: 'node-operations/docker' },
						{ label: 'Configuration', slug: 'node-operations/configuration' },
						{ label: 'Monitoring', slug: 'node-operations/monitoring' },
						{ label: 'Releases', slug: 'node-operations/releases' },
						{ label: 'basectl', slug: 'node-operations/basectl' },
					],
				},
				{
					label: 'Binaries',
					items: [
						{ label: 'base-reth-node', slug: 'binaries/base-reth-node' },
						{ label: 'basectl', slug: 'binaries/basectl' },
						{ label: 'based', slug: 'binaries/based' },
						{ label: 'builder', slug: 'binaries/builder' },
						{ label: 'consensus', slug: 'binaries/consensus' },
						{ label: 'ingress-rpc', slug: 'binaries/ingress-rpc' },
						{ label: 'mempool-rebroadcaster', slug: 'binaries/mempool-rebroadcaster' },
						{ label: 'websocket-proxy', slug: 'binaries/websocket-proxy' },
						{ label: 'audit-archiver', slug: 'binaries/audit-archiver' },
					],
				},
				{
					label: 'Contributing',
					slug: 'contributing',
				},
			],
		}),
	],
});
