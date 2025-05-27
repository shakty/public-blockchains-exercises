param (
    [switch]$clean,
    [switch]$compile
)

$optimizerModes = @("none", "low", "default", "high")

foreach ($mode in $optimizerModes) {
    Write-Host "=== Running with OPT_MODE=$mode ==="
    $env:OPT_MODE = $mode

    if ($clean) {
        Write-Host "→ Running hardhat clean"
        npx hardhat clean
    }

    if ($compile) {
        Write-Host "→ Running hardhat compile"
        npx hardhat compile
    }

    npx hardhat run compareDeploy.js --network hardhat
    Write-Host "`n"
}
