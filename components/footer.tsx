export default function Footer() {
	return (
		<footer>
			<div className="container mx-auto py-4 mt-12">
				<div className="h-[2rem] border-t border-foreground/25">
					<div className="h-[2rem] grid grid-cols-2">
						<div className="font-bold text-xl flex">
							<h1 className="my-auto py-8">Portfolios</h1>
						</div>
						<div className="flex opacity-70">
							<p className="ms-auto my-auto">
								&copy; 2023-{ new Date().getFullYear() }{' '}
								<a
									href="https://hivemindrobotics.net/"
									className="underline hover:opacity-70 transition-all"
									target="_blank"
								>
									hivemind
								</a>{' '}
								—{' '}
								<a href="/terms" className="underline hover:opacity-70 transition-all">
									Terms
								</a>{' '}
								&{' '}
								<a href="/privacy" className="underline hover:opacity-70 transition-all">
									Privacy
								</a>
							</p>
						</div>
					</div>
				</div>
			</div>
		</footer>
	);
}
